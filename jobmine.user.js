// ==UserScript==
// @name           Jobmine Upgrade
// @namespace      http://www.jamie-wong.com
// @description    Makes jobmine more accessible
// @require        http://code.jquery.com/jquery-1.4.1.min.js
// @require        http://http://tablesorter.com/jquery.tablesorter.min.js
// @include        https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=*
// @include        https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?cmd=start*
// @exclude        *IScript_ShowStuDocument*
// @exclude        *FieldFormula.IScript_ShowAllDocuments*
// ==/UserScript==
if ($("frame").length) {
    window.location = $("frame")[1].src;
}

// Insert navigation header at the top
var header = 'Jobmine Improved: ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_STUDENT&RL=&target=main0&navc=5170">Profile</a> | ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_STUDDOCS&RL=&target=main0&navc=5170">Documents</a> | ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_JOBSRCH&RL=&target=main0&navc=5170">Job Inquiry</a> | ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_JOB_SLIST&RL=&target=main0&navc=5170">Job Short List</a> | ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_APP_SUMMARY&RL=&target=main0&navc=5170">Applications</a> | ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_STU_INTVS&RL=&target=main0&navc=5170">Interviews</a> | ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_STU_RNK2&RL=&target=main0&navc=5170">Rankings</a> | ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_WORKRPRT&RL=&target=main0&navc=5170">Work Report Evalutions</a> | ';
header +=    '<a href="javascript:saveWarning(\'main\',null,\'_top\',\'/servlets/iclientservlet/SS/?cmd=logout\')">Logout</a>';


$("body").prepend(header);

if ($(".PAPAGETITLE").size()) {
    var title = $(".PAPAGETITLE")[0].innerHTML;
} else {
    var title = "";
}

var tables = $("table table table.PSLEVEL1GRID");
if (tables.size()) {
    for (var i = 0; i < tables.size(); i++) {
        curtab = $(tables[i]);
        curtab.prepend(
            $("<thead></thead>").append(curtab.find("tr:first").remove())
        );
    }

    tables.tablesorter();
    tables.find("td, th").css("border-bottom","1px solid #999");
}

if (title == "Application List") {
    tables.find("tr:contains('Ranking')").find("td").css("background-color","#777");
    tables.find("tr:contains('Selected')").find("td").css("background-color","#cfc");
    tables.find("tr:contains('Scheduled')").find("td").css("background-color","#9f9");
    tables.find("tr:contains('Not Selected')").find("td").css("background-color","#faa");
} else if (title == "Short List") {
    tables.find("tr:contains('Already Applied')").find("td").css("background-color","#9f9");
    tables.find("tr:contains('Not Posted')").find("td").css("background-color","#777");
} else if ($("body:contains('Group Interviews')").size()) {
    tables.find("tr:contains('Ranking')").find("td").css("background-color","#777");
    tables.find("tr:contains('Scheduled')").find("td").css("background-color","#9f9");
}    
