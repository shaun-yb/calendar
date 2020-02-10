updateHeader = function(month, year) {
    const monthHeader = document.getElementById("month");
    const yearHeader = document.getElementById("year");
    monthHeader.innerHTML = "";
    yearHeader.innerHTML = "";

    monthHeader.appendChild(document.createTextNode(month));
    monthHeader.appendChild(document.createTextNode(year));
}

updateCalendar = function(addMonth) {
    if (addMonth) {
        this.displayedDate.setMonth(this.displayedDate.getMonth() + 1);
    } else {
        this.displayedDate.setMonth(this.displayedDate.getMonth() -1);
    }
    
    const month = this.displayedDate.getMonth();
    const year = this.displayedDate.getFullYear();

    updateHeader(month, year);
    calendarService.buildCalendar(month, year);
}

window.onload = function() {
    this.displayedDate = new Date;
    const month = this.displayedDate.getMonth();
    const year = this.displayedDate.getFullYear();

    updateHeader(month, year);
    calendarService.buildCalendar(month, year);
}

var calendarService = (function() {
    const NUMBER_OF_WEEKS = 5;
    const DAYS_PER_WEEK = 7;

    buildCalendar = function(month, year) {
        clearCalendar();
        var daysBeforeMonthStart = getDaysBeforeMonthStart(month, year);
        var daysInMonth = getDaysInMonth(month, year);
        var dayCount = 1;
        
        for (var i =0; i < NUMBER_OF_WEEKS; i++) {
            var row = document.getElementById("row-" + i);
            
            for(var j =0; j < DAYS_PER_WEEK; j++) {
                var cell = document.createElement("td");
                
                if (daysBeforeMonthStart > 0) {
                    var cellContent = "";
                    daysBeforeMonthStart--;
                } else if (dayCount > daysInMonth) {
                    var cellContent = "";
                } else {
                    var cellContent = dayCount;
                    dayCount++;
                }
                cell.appendChild(document.createTextNode(cellContent));
                
                if (j == 0 || j == 6) {
                    cell.className += "weekend";
                }

                row.appendChild(cell);
            }
        }
    }
    getDaysBeforeMonthStart = function(month, year) {
        return new Date(year,month,1).getDay();
    }
    
    getDaysInMonth = function(month, year) {
        return 32 - new Date(year, month, 32).getDate();
    }

    clearCalendar = function() {
        for (var i = 0; i < NUMBER_OF_WEEKS; i++) {
            var row = document.getElementById("row-" + i);
            row.innerHTML = "";
        }
    }

    return {
        buildCalendar: buildCalendar,
    }
})();   
