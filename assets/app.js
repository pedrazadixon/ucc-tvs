var graficarAlatorios = function (container, randomArray) {
  var datosGrafica = [];

  var minimo = Math.min(...randomArray);
  var maximo = Math.max(...randomArray);
  var clases = Math.floor(1 + 3.322 * Math.log10(randomArray.length));
  var rango = maximo - minimo;
  var amplitud = rango / clases;

  var clase_actual_min = minimo;
  var clase_actual_max = minimo + amplitud;

  for (let clase = 1; clase <= clases; clase++) {
    datosGrafica[clase_actual_min] = 0;
    for (let number = 0; number < randomArray.length; number++) {
      if (clase == clases) {
        if (
          randomArray[number] >= clase_actual_min &&
          randomArray[number] <= clase_actual_max
        ) {
          datosGrafica[clase_actual_min] = datosGrafica[clase_actual_min] + 1;
        }
        continue;
      }
      if (
        randomArray[number] >= clase_actual_min &&
        randomArray[number] < clase_actual_max
      ) {
        datosGrafica[clase_actual_min] = datosGrafica[clase_actual_min] + 1;
      }
    }
    clase_actual_min = clase_actual_min + amplitud;
    clase_actual_max = clase_actual_max + amplitud;
  }

  if (grafica) grafica.destroy();

  var grafica = Highcharts.chart(container, {
    credits: {
      enabled: false,
    },
    chart: {
      type: "column",
    },
    title: {
      text: "Histograma",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      categories: Object.keys(datosGrafica).map(function (k, i) {
        return parseFloat(k).toFixed(3);
      }),
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 1,
        groupPadding: 0,
        shadow: false,
      },
    },
    series: [
      {
        name: "Cant.",
        data: Object.values(datosGrafica),
      },
    ],
  });
};
