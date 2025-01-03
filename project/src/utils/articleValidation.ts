interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateArticle(title: string, content: string): ValidationResult {
  const errors: string[] = [];

  // Title validation
  if (title.trim().length < 5) {
    errors.push('Title must be at least 5 characters long');
  }
  if (title.trim().length > 100) {
    errors.push('Title cannot exceed 100 characters');
  }

  // Content validation
  if (content.trim().length < 50) {
    errors.push('Content must be at least 50 characters long');
  }
  if (content.trim().length > 10000) {
    errors.push('Content cannot exceed 10,000 characters');
  }

  // Check for empty content or just whitespace
  if (!content.trim()) {
    errors.push('Content cannot be empty');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}