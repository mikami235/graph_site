// 2) CSVから２次元配列に変換
function csv2Array(str) {
  var csvData = [];
  var lines = str.split("\n");
  for (var i = 0; i < lines.length; ++i) {
    var cells = lines[i].split(",");
    csvData.push(cells);
  }
  return csvData;
}

function drawBarChart(data) {
  // 3)chart.jsのdataset用の配列を用意
  var tmpLabels = [], tmpData1 = [], tmpData2 = [];
  for (var row in data) {
    tmpLabels.push(data[row][0])
    tmpData1.push(data[row][1])
    tmpData2.push(data[row][2])
  };

  // 4)chart.jsで描画
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: tmpLabels,
      datasets: [
        { label: "Tokyo", data: tmpData1, backgroundColor: "red" },
        { label: "Osaka", data: tmpData2, backgroundColor: "blue" }
      ]
    }
  });
}

function makeLineChart(data) {
  am4core.ready(function() {
          
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    
    // Add data
    console.log(data);
    console.log(typeof data);
    console.log(data[1][1]);
    chart.data = generateChartData(); //　追加
    console.log(chart.data);
    
    // ["timestamp", "ax", "ay", "az", "wx", "wy", "wz", "mx", "my", "mz", "lat", "lng", "yaw"]
    
    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12,12,12,12)
    
    // Add scrollbar
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    
    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;
    
    function generateChartData() {
        var chartData = [];
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 1000);
        var visits = 1200;
        for (var i = 0; i < 500; i++) {
            // we create date objects here. In your data, you can have date strings
            // and then set format of your dates using chart.dataDateFormat property,
            // however when possible, use date objects, as this will speed up chart rendering.
            var newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + i);
            
            visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
    
            chartData.push({
                date: newDate,
                visits: visits
            });
        }
        return chartData;
    }
    
    });
}

function main() {
  // 1) ajaxでCSVファイルをロード
  var req = new XMLHttpRequest();
  var filePath = 'acc_gyro.csv';
  req.open("GET", filePath, true);
  req.onload = function() {
    // 2) CSVデータ変換の呼び出し
    data = csv2Array(req.responseText);
    // 3) chart.jsデータ準備、4) chart.js描画の呼び出し
    //drawBarChart(data);
    makeLineChart(data);
  }
  req.send(null);
}

main();
