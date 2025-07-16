import React from 'react';
import { useParams } from 'react-router-dom';
import { useStrapiBlogPost } from '../../hooks/useStrapi';
import BlogPostFooter from './BlogPostFooter';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading } = useStrapiBlogPost(slug);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 font-journal-sans">
          Loading article...
        </div>
        <div className="text-xs text-gray-400 mt-2 font-journal-sans">
          Please wait while we retrieve the full text
        </div>
      </div>
    );
  }
  if (!post) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 font-journal-sans">
          Article not found.
        </div>
        <div className="text-xs text-gray-400 mt-2 font-journal-sans">
          The requested article could not be located
        </div>
      </div>
    );
  }

  // Helper function to render text with formatting
  const renderText = (children: any[]) => {
    return children.map((child: any, childIndex: number) => {
      if (child.type === 'text') {
        let text = child.text;
        
        // Split text on newlines to preserve line breaks
        const textParts = text.split('\n');
        
        // If there are no newlines, render as before
        if (textParts.length === 1) {
          let element = <span key={childIndex}>{text}</span>;
          
          // Check for direct formatting properties on the child object
          if (child.bold) {
            element = <strong key={childIndex}>{element}</strong>;
          }
          if (child.italic) {
            element = <em key={childIndex}>{element}</em>;
          }
          if (child.underline) {
            element = <u key={childIndex}>{element}</u>;
          }
          if (child.strikethrough) {
            element = <del key={childIndex}>{element}</del>;
          }
          if (child.code) {
            element = <code key={childIndex} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{element}</code>;
          }
          
          // Also check for marks array (fallback for different data structures)
          if (child.marks && Array.isArray(child.marks)) {
            // Apply marks in reverse order so they nest properly
            child.marks.reverse().forEach((mark: string) => {
              switch (mark) {
                case 'bold':
                  element = <strong key={childIndex}>{element}</strong>;
                  break;
                case 'italic':
                  element = <em key={childIndex}>{element}</em>;
                  break;
                case 'underline':
                  element = <u key={childIndex}>{element}</u>;
                  break;
                case 'strikethrough':
                  element = <del key={childIndex}>{element}</del>;
                  break;
                case 'code':
                  element = <code key={childIndex} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{element}</code>;
                  break;
              }
            });
          }
          
          return element;
        }
        
        // If there are newlines, render each part with proper line breaks
        return (
          <React.Fragment key={childIndex}>
            {textParts.map((part: string, partIndex: number) => {
              let element = <span key={partIndex}>{part}</span>;
              
              // Apply formatting to each part
              if (child.bold) {
                element = <strong key={partIndex}>{element}</strong>;
              }
              if (child.italic) {
                element = <em key={partIndex}>{element}</em>;
              }
              if (child.underline) {
                element = <u key={partIndex}>{element}</u>;
              }
              if (child.strikethrough) {
                element = <del key={partIndex}>{element}</del>;
              }
              if (child.code) {
                element = <code key={partIndex} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{element}</code>;
              }
              
              // Apply marks array formatting
              if (child.marks && Array.isArray(child.marks)) {
                child.marks.reverse().forEach((mark: string) => {
                  switch (mark) {
                    case 'bold':
                      element = <strong key={partIndex}>{element}</strong>;
                      break;
                    case 'italic':
                      element = <em key={partIndex}>{element}</em>;
                      break;
                    case 'underline':
                      element = <u key={partIndex}>{element}</u>;
                      break;
                    case 'strikethrough':
                      element = <del key={partIndex}>{element}</del>;
                      break;
                    case 'code':
                      element = <code key={partIndex} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{element}</code>;
                      break;
                  }
                });
              }
              
              // Add line break after each part except the last one
              return partIndex < textParts.length - 1 ? (
                <React.Fragment key={partIndex}>
                  {element}
                  <br />
                </React.Fragment>
              ) : element;
            })}
          </React.Fragment>
        );
      }
      
      if (child.type === 'link') {
        return (
          <a 
            key={childIndex} 
            href={child.url} 
            className="text-blue-700 hover:text-blue-900 underline font-journal-sans"
            target="_blank"
            rel="noopener noreferrer"
          >
            {renderText(child.children)}
          </a>
        );
      }
      
      return null;
    });
  };

  const renderContent = (content: any[]) => {
    if (!content || !Array.isArray(content)) {
      return null;
    }

    return content.map((block, index) => {
      switch (block.type) {
        case 'paragraph':
          return (
            <p key={index} className="mb-4 text-gray-800 leading-relaxed font-journal-sans">
              {renderText(block.children)}
            </p>
          );
          
        case 'heading':
          const headingLevel = block.level || 2;
          const headingClasses = {
            1: "text-4xl font-bold mb-6 text-gray-900 font-journal-serif",
            2: "text-3xl font-bold mb-5 text-gray-900 font-journal-serif", 
            3: "text-2xl font-semibold mb-4 text-gray-900 font-journal-serif",
            4: "text-xl font-semibold mb-3 text-gray-900 font-journal-serif",
            5: "text-lg font-medium mb-3 text-gray-900 font-journal-serif",
            6: "text-base font-medium mb-2 text-gray-900 font-journal-serif"
          };
          
          const renderHeading = () => {
            const className = headingClasses[headingLevel as keyof typeof headingClasses];
            switch (headingLevel) {
              case 1:
                return <h1 key={index} className={className}>{renderText(block.children)}</h1>;
              case 2:
                return <h2 key={index} className={className}>{renderText(block.children)}</h2>;
              case 3:
                return <h3 key={index} className={className}>{renderText(block.children)}</h3>;
              case 4:
                return <h4 key={index} className={className}>{renderText(block.children)}</h4>;
              case 5:
                return <h5 key={index} className={className}>{renderText(block.children)}</h5>;
              case 6:
                return <h6 key={index} className={className}>{renderText(block.children)}</h6>;
              default:
                return <h2 key={index} className={className}>{renderText(block.children)}</h2>;
            }
          };
          
          return renderHeading();
          
        case 'quote':
          return (
            <blockquote key={index} className="relative my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-sm border border-gray-200 italic text-gray-700 font-journal-serif whitespace-pre-line">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-t-lg"></div>
              {renderText(block.children)}
            </blockquote>
          );
          
        case 'list':
          const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
          const listClasses = block.format === 'ordered' 
            ? "list-decimal list-inside mb-4 space-y-2 font-journal-sans" 
            : "list-disc list-inside mb-4 space-y-2 font-journal-sans";
          return (
            <ListTag key={index} className={listClasses}>
              {block.children.map((listItem: any, itemIndex: number) => (
                <li key={itemIndex} className="text-gray-800 leading-relaxed">
                  {renderText(listItem.children)}
                </li>
              ))}
            </ListTag>
          );
          
        case 'code':
        case 'code-block':
        case 'codeBlock':
          return (
            <pre key={index} className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4 font-mono text-sm">
              <code className="text-gray-800">
                {block.children.map((child: any) => 
                  child.type === 'text' ? child.text : ''
                ).join('')}
              </code>
            </pre>
          );
          
        case 'image':
          return (
            <figure key={index} className="my-6">
              <img 
                src={block.url} 
                alt={block.alt || 'Blog image'} 
                className="w-full h-auto rounded-lg border border-gray-200"
              />
              {block.caption && (
                <figcaption className="text-center text-sm text-gray-600 mt-2 font-journal-sans">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
          
        case 'hr':
          return <hr key={index} className="my-8 border-gray-300" />;
          
        default:
          return null;
      }
    });
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <article className="max-w-4xl mx-auto">
        {/* Article Header */}
        <header className="mb-8 border-b-2 border-gray-300 pb-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 leading-tight font-journal-serif">
            {post.title}
          </h1>
          
          {/* Author and Date */}
          <div className="flex items-center text-sm text-gray-600 mb-4 font-journal-sans">
            <span className="font-medium">{post.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          {/* Article Image */}
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-64 object-cover rounded border border-gray-200 mb-4" 
          />
          
          {/* Abstract */}
          <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-600">
            <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider font-journal-serif">
              Abstract
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed font-journal-sans">
              {post.excerpt}
            </p>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-800 leading-relaxed font-journal-sans">
            {renderContent(post.content)}
          </div>
        </div>
        
        {/* Special footer for melee-at-24 */}
        {slug === 'melee-at-24' && <BlogPostFooter />}
      </article>
    </div>
  );
};

export default BlogPostPage; 