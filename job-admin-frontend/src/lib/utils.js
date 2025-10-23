// Format salary for display
export function formatSalary(min, max) {
  const formatNumber = (num) => {
    if (num >= 100000) {
      return `₹${(num / 100000).toFixed(0)}L`; // Lakhs
    }
    return `₹${(num / 1000).toFixed(0)}k`; // Thousands
  };

  if (min === 0 && max === 0) return 'Not Disclosed';
  if (min === 0) return `Up to ${formatNumber(max)}`;
  if (max === 0) return `From ${formatNumber(min)}`;
  
  return `${formatNumber(min)} - ${formatNumber(max)}`;
}

// Format date for display
export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d Ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w Ago`;
  return `${Math.floor(diffDays / 30)}m Ago`;
}

// Get company logo placeholder (you can replace with actual logic)
export function getCompanyLogo(companyName) {
  const logos = {
    'Amazon': 'https://logo.clearbit.com/amazon.com',
    'Tesla': 'https://logo.clearbit.com/tesla.com',
    'Swiggy': 'https://logo.clearbit.com/swiggy.com',
    'Microsoft': 'https://logo.clearbit.com/microsoft.com',
  };
  
  return logos[companyName] || null;
}

// Truncate text
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
