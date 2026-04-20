import React from 'react'
import Date from "react-datepicker";

const DatePicker = ({
     showYearPicker = false,
     placeholder = "Select Date",
     value = null,
     onDateChange
}) => {
     const handleDateChange = (date) => {
          if (!onDateChange) return

          if (showYearPicker) {
               // Return only year value when year picker is active
               onDateChange(date ? date.getFullYear() : null)
          } else {
               // Return ISO string format when date picker is active
               onDateChange(date ? date.toISOString() : null)
          }
     }

     return (
          <div>
               <Date
                    selected={value}
                    onChange={handleDateChange}
                    showYearPicker={showYearPicker}
                    dateFormat={showYearPicker ? "yyyy" : "MM/dd/yyyy"}
                    showMonthDropdown={!showYearPicker}
                    showYearDropdown={!showYearPicker}
                    scrollableYearDropdown={showYearPicker}
                    yearDropdownItemNumber={showYearPicker ? 15 : 1}
                    // minDate={new Date(2024, 0, 1)}
                    placeholderText={placeholder}
                    className="w-fit px-1 py-1 rounded-md border border-slate-300 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent placeholder:text-[0.9rem]"
               />
          </div>
     )
}

export default DatePicker;