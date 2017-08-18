var grid1;
var grid2;
var options;
var lastData = [];

$(document).ready(function () {
    initGrid1();
    initGrid2();
    initChart();
    requestExchange();
    setInterval(requestExchange, 10000);
    $("#txt2").change(function () { calculate(); });
    $("#ddl1").change(function () { calculate(); });
    $("#ddl2").change(function () { calculate(); });
    $("#txt2").keypress(function (e) {
        if (e.which == 13) 
            calculate();
    });
});

function calculate() {
    var val = parseFloat($("#txt2").val())
    if (val.toString() == "NaN") {
        $("#txt1").val("");
        return;
    }
    if ($("#ddl1").val() == "USD" && $("#ddl2").val() == "BTC") {
        var BTC = parseFloat(lastData[lastData.length - 1].BTC.USD);
        resp = (val * BTC);
        $("#txt1").val(resp);
    }
    else if ($("#ddl1").val() == "USD" && $("#ddl2").val() == "ETH") {
        var ETH = parseFloat(lastData[lastData.length - 1].ETH.USD);
        resp = (val * ETH);
        $("#txt1").val(resp);
    }
    
    else if ($("#ddl1").val() == "EUR" && $("#ddl2").val() == "BTC") {
        var BTC = parseFloat(lastData[lastData.length - 1].BTC.EUR);
        resp = (val * BTC);
        $("#txt1").val(resp);
    }
    else if ($("#ddl1").val() == "EUR" && $("#ddl2").val() == "ETH") {
        var ETH = parseFloat(lastData[lastData.length - 1].ETH.EUR);
        resp = (val * ETH);
        $("#txt1").val(resp);
    }
}

function initGrid1() {
    grid1 = $('#grid1').DataTable({
        data: lastData,
        "searching": false,
        "lengthMenu": [5, 10, 25, 50, 100],
        "order": [[0, "desc"]],
        columns: [
            { title: "Time", data: 'TIME' },
            { title: "USD", data: 'BTC.USD' },
            { title: "EUR", data: 'BTC.EUR' }
        ]
    });
}

function initGrid2() {
    grid2 = $('#grid2').DataTable({
        data: lastData,
        "searching": false,
        "lengthMenu": [5, 10, 25, 50, 100],
        "order": [[0, "desc"]],
        columns: [
            { title: "Time", data: 'TIME' },
            { title: "USD", data: 'ETH.USD' },
            { title: "EUR", data: 'ETH.EUR' },
            { title: "BTC", data: 'ETH.BTC' }
        ]
    });
}

function initChart() {
    options = {
        title: { text: 'Exchange rate' },
        subtitle: { text: moment(new Date()).format('ll') },
        yAxis: {
            title: {
                text: 'USD'
            }
        },

        xAxis: {
            categories: []
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        series: [{ name: 'BTC' }, { name: 'ETH' }]
    };

    $('#container').highcharts(options);
    options.series[0].data = [];
    options.series[1].data = [];
}

function requestExchange() {
    $.ajax({
        type: 'GET',
        url: "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR,BTC",
        datatype: 'json',
        success: function (data) {
            data.TIME = moment(new Date()).format('h:mm:ss a');
            lastData.push(data);
            if (lastData.length > 10) {
                options.xAxis.categories.shift();
                options.series[0].data.shift();
                options.series[1].data.shift();
            }
            options.xAxis.categories.push(data.TIME);
            options.series[0].data.push(data.BTC.USD);
            options.series[1].data.push(data.ETH.USD);
            grid1.row.add(data).draw();
            grid2.row.add(data).draw();
            $('#container').highcharts(options);
            $('#BTC').html("1 BTC = " + data.BTC.USD + " USD");
            $('#ETH').html("1 ETH = " + data.ETH.USD + " USD");
            calculate();
        }
    });
    
}