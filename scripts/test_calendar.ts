// Test script to check pagination limits for Google Calendar API

const CALENDAR_ID = '86oup09opi66vbhshrftu4uijs@group.calendar.google.com';
const API_KEY = process.env.GOOGLE_CALENDAR_API_KEY || 'YOUR_API_KEY_HERE'; // Get from environment variable

// Test 1: Try to get all events for a full year with maxResults
async function testMaxResults() {
  console.log('=== Testing maxResults parameter ===');
  
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');
  
  const maxResultsToTest = [10, 50, 100, 250, 500, 1000, 2500];
  
  for (const maxResults of maxResultsToTest) {
    try {
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?` +
        `key=${API_KEY}&` +
        `timeMin=${startDate.toISOString()}&` +
        `timeMax=${endDate.toISOString()}&` +
        `singleEvents=true&` +
        `orderBy=startTime&` +
        `maxResults=${maxResults}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log(`maxResults=${maxResults}: Got ${data.items?.length || 0} events, nextPageToken: ${data.nextPageToken ? 'YES' : 'NO'}`);
      
      // If no nextPageToken, we got everything
      if (!data.nextPageToken) {
        console.log(`✅ Complete dataset retrieved with maxResults=${maxResults}`);
        break;
      }
    } catch (error) {
      console.error(`❌ Error with maxResults=${maxResults}:`, error.message);
    }
  }
}

// Test 2: Try without maxResults parameter (see what default is)
async function testDefaultBehavior() {
  console.log('\n=== Testing default behavior (no maxResults) ===');
  
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');
  
  try {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?` +
      `key=${API_KEY}&` +
      `timeMin=${startDate.toISOString()}&` +
      `timeMax=${endDate.toISOString()}&` +
      `singleEvents=true&` +
      `orderBy=startTime`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log(`Default behavior: Got ${data.items?.length || 0} events, nextPageToken: ${data.nextPageToken ? 'YES' : 'NO'}`);
    
    return {
      eventCount: data.items?.length || 0,
      hasNextPage: !!data.nextPageToken,
      totalPages: data.nextPageToken ? 'Multiple' : '1'
    };
  } catch (error) {
    console.error('❌ Error with default behavior:', error.message);
    return null;
  }
}

// Test 3: Count total events using pagination (to know the full dataset size)
async function countTotalEvents() {
  console.log('\n=== Counting total events in calendar ===');
  
  const startDate = new Date('2015-01-01'); // Go way back to get everything
  const endDate = new Date('2025-12-31');   // Go into future
  
  let totalEvents = 0;
  let pageToken = undefined;
  let pageCount = 0;
  
  try {
    do {
      pageCount++;
      const params = new URLSearchParams({
        key: API_KEY,
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: 'true',
        orderBy: 'startTime',
        maxResults: '250' // Reasonable page size
      });
      
      if (pageToken) {
        params.append('pageToken', pageToken);
      }
      
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params}`;
      const response = await fetch(url);
      const data = await response.json();
      
      const pageEventCount = data.items?.length || 0;
      totalEvents += pageEventCount;
      pageToken = data.nextPageToken;
      
      console.log(`Page ${pageCount}: ${pageEventCount} events`);
      
      // Safety break to avoid infinite loop
      if (pageCount > 50) {
        console.log('⚠️ Stopped at 50 pages to avoid infinite loop');
        break;
      }
      
    } while (pageToken);
    
    console.log(`\n📊 Total events found: ${totalEvents} across ${pageCount} pages`);
    return { totalEvents, pageCount };
    
  } catch (error) {
    console.error('❌ Error counting events:', error.message);
    return null;
  }
}

// Test 4: Quick sample of different time ranges
async function testTimeRanges() {
  console.log('\n=== Testing different time ranges ===');
  
  const timeRanges = [
    { name: '1 month', start: new Date('2024-01-01'), end: new Date('2024-02-01') },
    { name: '3 months', start: new Date('2024-01-01'), end: new Date('2024-04-01') },
    { name: '6 months', start: new Date('2024-01-01'), end: new Date('2024-07-01') },
    { name: '1 year', start: new Date('2024-01-01'), end: new Date('2025-01-01') },
    { name: '5 years', start: new Date('2020-01-01'), end: new Date('2025-01-01') },
  ];
  
  for (const range of timeRanges) {
    try {
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?` +
        `key=${API_KEY}&` +
        `timeMin=${range.start.toISOString()}&` +
        `timeMax=${range.end.toISOString()}&` +
        `singleEvents=true&` +
        `orderBy=startTime&` +
        `maxResults=1000`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log(`${range.name}: ${data.items?.length || 0} events, pagination needed: ${data.nextPageToken ? 'YES' : 'NO'}`);
    } catch (error) {
      console.error(`❌ Error with ${range.name}:`, error.message);
    }
  }
}

// Run all tests
async function runAllTests() {
  console.log('🧪 Starting Calendar API pagination tests...\n');
  
  await testDefaultBehavior();
  await testMaxResults();
  await testTimeRanges();
  await countTotalEvents();
  
  console.log('\n✅ All tests completed!');
  console.log('\n💡 Recommendations:');
  console.log('- If total events < 250: Skip pagination, use single request');
  console.log('- If total events > 250: Implement pagination');
  console.log('- Consider caching results if data doesn\'t change frequently');
}

// Uncomment to run the tests
runAllTests();

// Quick single test function you can run in browser console
function quickTest() {
  // Just test the default behavior for current year
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');
  
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?` +
    `key=${API_KEY}&` +
    `timeMin=${startDate.toISOString()}&` +
    `timeMax=${endDate.toISOString()}&` +
    `singleEvents=true&` +
    `orderBy=startTime&` +
    `maxResults=500`;
  
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Quick test results:');
      console.log(`Events retrieved: ${data.items?.length || 0}`);
      console.log(`Pagination needed: ${data.nextPageToken ? 'YES' : 'NO'}`);
      return data;
    });
}