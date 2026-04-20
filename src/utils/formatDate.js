/**
 * Format date to DD MMM YYYY format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 * Example: '2024-01-15' => '15 Jan 2024'
 */
export const formatDate = (date) => {
  if (!date) return ''

  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return ''

  const day = String(dateObj.getDate()).padStart(2, '0')
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const month = monthNames[dateObj.getMonth()]
  const year = dateObj.getFullYear()

  return `${day} ${month} ${year}`
}

/**
 * Format date to time ago format
 * @param {string|Date} date - Date to format
 * @returns {string} Time ago string
 * Example: 2 hours ago, 3 days ago
 */
export const formatTimeAgo = (date) => {
  if (!date) return ''

  const dateObj = new Date(date)
  const now = new Date()
  const seconds = Math.floor((now - dateObj) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`

  return formatDate(date)
}

/**
 * Format date for input fields (YYYY-MM-DD)
 * @param {string|Date} date - Date to format
 * @returns {string} Date string in YYYY-MM-DD format
 */
export const formatDateForInput = (date) => {
  if (!date) return ''

  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return ''

  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * Get month year string
 * @param {number} month - Month number (1-12)
 * @param {number} year - Year
 * @returns {string} Month Year string
 * Example: 1, 2024 => 'Jan 2024'
 */
export const getMonthYearString = (month, year) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return `${monthNames[month - 1]} ${year}`
}
