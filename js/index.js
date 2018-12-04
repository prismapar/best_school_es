$(document).ready(function(){

    $("#top").change(function () {
       getTop()     
    });  

     
    $("#department").change(function () {
       //getTop()
       load_municipalities();
       filterSchools();

    });  

    $("#municipality,#studentsNumber,#studentsNumberSaber,#schoolName").change(function () {
       //getTop()
       filterSchools()
    });  

    $('input[type=radio][name=schoolTypeOptions]').change(function() { 
          filterSchools()
    }); 

    $('input[type=radio][name=calendarOptions]').change(function() { 
          filterSchools()
    });

});

var rowHeight = 20;

var columns = [
    "formula_1",
    "formula_2",
    "formula_3",
    "total"
];

var sortKey = "ranking",
    sortOrder = d3.ascending,
    sortOrderString = "ascending";

var formatCurrency = d3.format("$,.0f"),
    formatNumber = d3.format(".0f"), 
    formatPercentage = d3.format("0%");

var x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 200]);

/*data*/
var all_schools = [];
var filtered_schools = [];
var all_department = [];
var all_municipality = [];


/*filters*/
var school_top = 0,
    school_department = "",
    school_municipality = "",
    school_type = "",
    school_calendar = "",
    school_students_numbers = 0,
    school_students_numbers_saber_11 = 0,
    school_name_array = [];


d3.csv("data_school.csv",
    (d) => {
        all_schools.push(d);
    }
).then(() => {   

    for (var i = 0; i < all_schools.length; i++) {

        all_schools[i].Matriculados = +all_schools[i].Matriculados;
        all_schools[i].Publicados = +all_schools[i].Publicados;
        all_schools[i].formula_1 = parseFloat(all_schools[i].formula_1);
        all_schools[i].formula_2 = parseFloat(all_schools[i].formula_2);
        all_schools[i].formula_3 = parseFloat(all_schools[i].formula_3);      
    }  
      
    school_top = $("#top").val();
    filtered_schools = all_schools.filter(filterByRanking);
    //console.log("filtered schools: " + filtered_schools.length);
    load_table_visualization(filtered_schools);  
    load_schools();  
   
    //loadSliders();  
    loadParalelCoordinates(filtered_schools);
    loadBarcharVisualization(filtered_schools);

  
});

//departamentos y municipios
d3.csv("department.csv",
    (d) => {
        all_department.push(d);
    }
).then(() => {  
  
   load_departments(); 
  
});

//departamentos y municipios
d3.csv("municipalities.csv",
    (d) => {
        all_municipality.push(d);
    }
).then(() => {  
  
   load_municipalities(); 
  
});


function filterByRanking(object) {
    //console.log("school_top CH:" + parseInt(school_top));
    //return parseInt(object.ranking) == 100;
    return parseInt(object.ranking) <= parseInt(school_top);
}

function filterByDepartment(object) {
    return object.department == school_department;
}

function filterByMunicipality (object) {
    return object.city == school_municipality;
}

function filterBySchoolType(object) {
    return object.sector == school_type;
}

function filterByCalendar(object) {
    return object.calendar == school_calendar;
}

function filterByStudentsNumber(object) {

    let objectResult = null;

    if(school_students_numbers === "less100")
    {
        objectResult = (object.Matriculados <= 100);
    }
    else if(school_students_numbers === "bet100500")
    {
        objectResult = (object.Matriculados >= 100 && object.Matriculados <= 500);
    }
    else if(school_students_numbers === "more1000")
    {
         objectResult = (object.Matriculados >= 1000);
    }

    return objectResult;
}

function filterByStudentsNumberSaber11(object) {  

    return object.Publicados >= parseInt(school_students_numbers_saber_11);
}

function filterBySchoolName(object) {     
  
    for (var i=0; i<school_name_array.length; i++){

         let dane_code = school_name_array[i];        

         if(object.dane_code == dane_code)
         {
            return true;
         }         
    }     

    return false;
}


function getTop(){

    school_top = $("#top").val();
    console.log("filtered top: " + school_top);
    
    filtered_schools = all_schools.filter(filterByRanking);

    filterSchools();    

}

function filterSchools()
{
    //school_top = $("#top").val();
    school_department = $("#department").val();
    school_municipality = $("#municipality").val();
    school_type = $("input[name='schoolTypeOptions']:checked").val(); 
    school_calendar = $("input[name='calendarOptions']:checked").val(); 
    school_students_numbers = $("#studentsNumber").val();
    school_students_numbers_saber_11 = $("#studentsNumberSaber").val();
    school_name_array = $('.selectpicker').val();

    //console.log("school_top: " + school_top);
    console.log("school_department: " + school_department);
    console.log("school_municipality: " + school_municipality);
    console.log("school_type: " + school_type);
    console.log("school_calendar: " + school_calendar);
    console.log("school_students_numbers: " + school_students_numbers);
    console.log("school_students_numbers_saber_11: " + school_students_numbers_saber_11);
    console.log("school_name array");
    console.log(school_name_array);
    

    let filtered_schools_temp = filtered_schools;
 
    if(school_department != "ALL"){
        filtered_schools_temp = filtered_schools_temp.filter(filterByDepartment);
    }
    if(school_municipality != "ALL"){
        filtered_schools_temp = filtered_schools_temp.filter(filterByMunicipality);
    }
    if(school_type != "ALL"){
        filtered_schools_temp = filtered_schools_temp.filter(filterBySchoolType);
    }
    if(school_calendar != "ALL"){
        filtered_schools_temp = filtered_schools_temp.filter(filterByCalendar);
    }
    if(school_students_numbers != "ALL"){
        filtered_schools_temp = filtered_schools_temp.filter(filterByStudentsNumber);
    }      

    if(school_students_numbers_saber_11 != "ALL"){
        filtered_schools_temp = filtered_schools_temp.filter(filterByStudentsNumberSaber11);
    }
  
    if(school_name_array.length > 0){
        //console.log("entro school name");
        filtered_schools_temp = filtered_schools_temp.filter(filterBySchoolName);
    }
 

    //console.log("filtered schools: " + filtered_schools_temp.length);
    //console.log(filtered_schools_temp);

    load_table_visualization(filtered_schools_temp); 
    loadParalelCoordinates(filtered_schools_temp); 
    loadBarcharVisualization(filtered_schools_temp);
}

function getSchools(){

    console.log($('.selectpicker').val());
}



function load_departments()
{
     $("#department").append('<option value="ALL">TODOS</option>'); 

    for (var i=0; i<all_department.length; i++){
        $("#department").append('<option value="' + all_department[i].departamento + '">' + all_department[i].departamento + '</option>'); 
    }     
}

function load_municipalities()
{
    $('#municipality').empty();

    $("#municipality").append('<option value="ALL">TODOS</option>'); 

    let department = $("#department").val();
    console.log("selected department:" + department);

    for (var i=0; i<all_municipality.length; i++){

        if(department != "ALL")
        {

          if(all_municipality[i].departamento == department)
          {
             console.log("municiop department:");
           console.log(all_municipality[i].departamento);

            $("#municipality").append('<option value="' + all_municipality[i].municipio + '">' + all_municipality[i].municipio + '</option>'); 
          }
        }
        else
        {
          $("#municipality").append('<option value="' + all_municipality[i].municipio + '">' + all_municipality[i].municipio + '</option>');           
        }        
    }     
}

function load_schools()
{
    //console.log("DATA FILTER SCHOOL:" + filtered_schools)
    // $("#schools").append('<option value="TODOS">TODOS</option>'); 
    //$('#schoolName').append('<option value="ALL" selected hidden>ALL</option>');   
    //$(".selectpicker").selectpicker();

    for (var i=0; i<filtered_schools.length; i++){
       // $("#schools").append('<option value="' + filtered_schools[i].dane_code + '">' + filtered_schools[i].school + '</option>'); 
        $("#schoolName").append('<option value="' + filtered_schools[i].dane_code + '">' + filtered_schools[i].school + '</option>'); 
    }     

    $("#schoolName").selectpicker("refresh");
    //$('.selectpicker').selectpicker('refresh');
   // console.log($("#schoolName"));
    //$("#schoolName").selectpicker("refresh");
    //$('.selectpicker').selectpicker("refresh");
 
}


/*school ranking*/
function load_table_visualization(schools_data)
{
    //console.log(schools_data);

    $(".g-table-body-states").empty();    

    var stateRow = d3.select(".g-table-body-states")
        .style("height", schools_data.length * rowHeight + "px")
        .selectAll(".g-table-row")
        .data(schools_data.sort(function(a, b) {
            //console.log(sortOrder);           
       
            if (sortOrderString === "ascending")
            {
                return (a[sortKey] - b[sortKey]);
            }
            else
            {
                return (b[sortKey] - a[sortKey]);
            }                 
            
            //return sortOrder(a[sortKey], b[sortKey]);
        }))
        .enter().append("div")
        .attr("class", "g-table-row")
        .style("top", function(d, i) {
            return i * rowHeight + "px";
        });

    var row = d3.selectAll(".g-table-body .g-table-row");

    //Insert data
     row.append("div")
        .attr("class", "g-table-cell g-table-cell-ranking")
        .text(function(d) {
            return d.ranking;
        });

    row.append("div")
        .attr("class", "g-table-cell g-table-cell-school")
        .text(function(d) {
            return d.school;
        });

     row.append("div")
        .attr("class", "g-table-cell g-table-cell-city")
        .text(function(d) {
            return d.city;
        });


    //insert data with barchart
    columns.forEach(function(c) {
        row.append("div")
            .attr("class", "g-table-cell g-table-cell-" + c)
            .append("div")
            .datum(function(d) {
                //console.log(d[c]);
                return +d[c];
            })
            .attr("class", "g-table-bar")
            .append("div")
            .attr("class", "g-table-label")
            .text(function(d, i) {  
                //console.log("test");      
                //console.log(d);        
                return d + "%"; // formatNumber(d); // formatPercentage(d);
                //return (i ? formatNumber : formatCurrency)(d);
            });
    });

    var bar = row.selectAll(".g-table-bar")
        .style("width", 0);

    //barchar
    row.transition()                                          
        .delay(function(d, i) {
            return i * 8;
        })                                               
        .selectAll(".g-table-bar")  
        .on("start",  function(d) {                                             
        //.each("start", function(d) {
            this.style.width = x(d) + "px";
        });

        

    var columnLabel = d3.selectAll(".g-table-head .g-table-cell")
        .datum(function() {
            //console.log(this.getAttribute("data-key"));
            return this.getAttribute("data-key");
        })
        .on("click", clicked)
        .select(".g-table-column")
        .classed("g-table-column-" + (sortOrder === d3.ascending ? "ascending" : "descending"), function(d) {
            return d === sortKey;
        });

    function clicked(key) {
        d3.event.preventDefault();
        //console.log("clicked: "+ key);
        columnLabel
            .classed("g-table-column-" + (sortOrder === d3.ascending ? "ascending" : "descending"), false);

        //console.log("sortKey: "+ sortKey);

        if (sortKey === key) sortOrder = sortOrder === d3.ascending ? d3.descending : d3.ascending;
        else sortKey = key;

        //console.log("sortKey: "+ sortKey);

        schools_data
            .sort(function(a, b) {
                //console.log("a sortKey: "+ a[sortKey]);
                //console.log("b sortKey: "+ b[sortKey]);

                order = (sortOrder === d3.ascending ? "ascending" : "descending");

                if(key === "school" || key === "city")
                {
                    return sortOrder(a[sortKey], b[sortKey]);
                }
                else            
                {
                    if (order === "ascending")
                    {
                        return (a[sortKey] - b[sortKey]);
                    }
                    else
                    {
                        return (b[sortKey] - a[sortKey]);
                    }   
                }   

                //return sortOrder(a[sortKey], b[sortKey]);
            })
            .forEach(function(d, i) {
                //console.log("index sortKey: "+ i);
                //console.log("d: "+ d[sortKey]);
                d.index = i;
            });

        columnLabel
            .classed("g-table-column-" + (sortOrder === d3.ascending ? "ascending" : "descending"), function(d) {
                return d === sortKey;
            });

                   
        stateRow.transition()
            .delay(function(d) {
                return d.index * 8;
            })
            .on("start",  function(d) {  
            //.each("start", function(d) {
                return this.style.top = d.index * rowHeight + "px";
            });        
    }   

}

function type(d) {
    d.formula_1 = +d.formula_1;
    d.formula_2 = +d.formula_2;
    d.formula_3 = +d.formula_3;    
    return d;
}

function changeType(d) {
    //console.log(d);
return 0; //+d.replace(".",",");
}

// Adición Visualización 2
function redondeo(numero, decimales)
{
  var flotante = parseFloat(numero);
  var resultado = Math.round(flotante*Math.pow(10,decimales))/Math.pow(10,decimales);
  return resultado;
};

function calcularPromedios (datos){

  // Generar Copia del arreglo

      const datosFiltrados = datos.slice(0); 

      var sum_formula1 = 0;
      var sum_formula2 = 0;
      var sum_formula3 = 0;
      var sum_total = 0;
      var prom_formula1 = 0;
      var prom_formula2 = 0;
      var prom_formula3 = 0;
      var prom_total = 0;

      for (i = 0; i < datosFiltrados.length; i++) {

        sum_formula1 += +datosFiltrados[i]["formula_1"];
        sum_formula2 += +datosFiltrados[i]["formula_2"];
        sum_formula3 += +datosFiltrados[i]["formula_3"];
        sum_total += +datosFiltrados[i]["total"];

      };

      prom_formula1 = redondeo(sum_formula1 / datosFiltrados.length,2);
      prom_formula2 = redondeo(sum_formula2 / datosFiltrados.length,2);
      prom_formula3 = redondeo(sum_formula3 / datosFiltrados.length,2);
      prom_total = redondeo(sum_total / datosFiltrados.length,2);

      datosFiltrados.forEach(function(d){
                d["formula_1"] = +d["formula_1"];
                d["formula_2"] = +d["formula_2"];
                d["formula_3"] = +d["formula_3"];
                d["total"] = +d["total"];
            });

      var datosProm = {"ranking":0,
                       "dane_code":0,
                       "city":"N/A",
                       "department":"N/A",
                       "school":" PROMEDIO",
                       "sector":"N/A",
                       "calendar":"N/A",
                       "Matriculados":0,
                       "Publicados":0,
                       "puesto_saber_11":0,
                       "promedio_puntaje_global_saber_11":0,
                       "desviacion_general":0,
                       "isce_media":0,
                       "isce_secundaria":0,
                       "isce_primaria":0,
                       "saber_9_general":0,
                       "saber_5_general":0,
                       "saber_3_general":0,
                       "formula_1":prom_formula1,
                       "formula_2":prom_formula2,
                       "formula_3":prom_formula3,
                       "total":prom_total};

      var datosCol = {"ranking":0,
                       "dane_code":1,
                       "city":"N/A",
                       "department":"N/A",
                       "school":" COLOMBIA",
                       "sector":"N/A",
                       "calendar":"N/A",
                       "Matriculados":0,
                       "Publicados":0,
                       "puesto_saber_11":0,
                       "promedio_puntaje_global_saber_11":0,
                       "desviacion_general":0,
                       "isce_media":0,
                       "isce_secundaria":0,
                       "isce_primaria":0,
                       "saber_9_general":0,
                       "saber_5_general":0,
                       "saber_3_general":0,
                       "formula_1":59.34,
                       "formula_2":54.84,
                       "formula_3":86.89,
                       "total":68.14};

      datosFiltrados.push(datosProm);
      datosFiltrados.push(datosCol);

      return datosFiltrados;

};

function loadParalelCoordinates (datos){

    $("#chart-area").empty();

    var margin = { left:300, right:20, top:30, bottom:20 };

    var width = 1300 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    // Duración de la transición        

    var t = function(){ return d3.transition().duration(1000); } 

    // Definición escalas de cada eje y

    var escalas = [
      {
        nombre_escala: "school",
        scale: d3.scalePoint().range([0, height]),
        type: String,
        titulo: "Colegios"
      },
      {
        nombre_escala: "formula_1",
        scale: d3.scaleLinear().range([height, 0]),
        type: Number,
        titulo: "Pruebas Saber 3,5,9,11 (%)"
      },
      {
        nombre_escala: "formula_2",
        scale: d3.scaleLinear().range([height, 0]),
        type: Number,
        titulo: "Indice sintético (%)"
      },
      {
        nombre_escala: "formula_3",
        scale: d3.scaleLinear().range([height, 0]),
        type: Number,
        titulo: "Nivel de Inclusión (%)"
      },
      {
        nombre_escala: "total",
        scale: d3.scaleLinear().range([height, 0]),
        type: Number,
        titulo: "Total (%)"
      }
    ];

    // Definición eje x

    var x = d3.scalePoint()
        .domain(escalas.map(function(d) { return d.nombre_escala; }))
        .range([0, width]);

    // Definición linea

    var line = d3.line()
        .defined(function(d) { return !isNaN(d[1]); });

    // Eje y

    var yAxis = d3.axisLeft();

    // adición de svg en html

    var g = d3.select("#chart-area")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    // Creación de cada eje y

    var eje = g.selectAll(".eje")
        .data(escalas)
      .enter().append("g")
        .attr("class", "eje")
        .attr("transform", function(d) { return "translate(" + x(d.nombre_escala) + ")"; });

    update (datos);

    // Coloca los nombres a cada eje y
          
    eje.append("text")
      .attr("class", "title")
      .attr("text-anchor", "middle")
      .attr("y", -15)
      .text(function(d) { return d.titulo; });

    var projection = g.selectAll(".axis text,.background path,.foreground path")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

    // evento que se activa cuando se coloca el mouse sobre las lineas o nombres

    function mouseover(datos) {

        g.classed("active", true);
        projection.classed("inactive", function(p) { 
          return p !== datos; 
        }); 
        projection.filter(function(p) { return p === datos; }).each(MoverAdelante);

    }

    function mouseout(datos) {
        g.classed("active", false);
        projection.classed("inactive", false);
    }

    function MoverAdelante() {
        this.parentNode.appendChild(this);
    }

    function dibujarLineas(datos) {
      return line(escalas.map(function(eje) {
        return [x(eje.nombre_escala), eje.scale(datos[eje.nombre_escala])];
      }));
    };

    function update(datos){

        // Llama a funcion que adiciona promedios de colegios seleccionados y de Colombia al dataset

        datosNew = calcularPromedios (datos);

        // Asigna a cada eje su escala correspondiente

        escalas.forEach(function(eje) {
            eje.scale.domain(eje.type === Number
            ? d3.extent(datosNew, function(d) { return +d[eje.nombre_escala]; })
            : datosNew.map(function(d) { return d[eje.nombre_escala]; }).sort());
        });

        // Dibuja lineas con base en los datos

        var datosFilProm = datosNew.filter(function(d){
            return (d.dane_code == 0);
        });

        var datosFilCol = datosNew.filter(function(d){
            return (d.dane_code == 1);
        });

        g.append("g")
          .attr("class", "background")
        .selectAll("path")
          .data(datosNew)
        .enter().append("path")
          .attr("d", dibujarLineas)
          .attr("class",function(d) { return d.school;});

        g.append("g")
          .attr("class", "foreground")
        .selectAll("path")
          .data(datosNew)
        .enter().append("path")
          .attr("d", dibujarLineas)
          .attr("class",function(d) { return d.school;});

        g.append("g")
          .attr("class", "foregroundProm")
        .selectAll("path")
          .data(datosFilProm)
        .enter().append("path")
          .attr("d", dibujarLineas)
          .attr("class",function(d) { return d.school;});

        g.append("g")
          .attr("class", "foregroundCol")
        .selectAll("path")
          .data(datosFilCol)
        .enter().append("path")
          .attr("d", dibujarLineas)
          .attr("class",function(d) { return d.school;});

        eje.append("g")
          .attr("class", "axis")
          .each(function(d) { d3.select(this).transition(t()).call(yAxis.scale(d.scale)); });

        // Rebindir los datos del eje para simplificar el mouseover.

        g.select(".axis").selectAll("text:not(.title)")
          .attr("class", "label")
          .style("font-size","7px")
          .data(datosNew, function(d) { return d.school || d; });

    };

};


//vis 3
function loadBarcharVisualization(school_data)
{
    let data = [];


    //console.log(school_data);


     for (var i = 0; i < 5; i++) {

        //console.log(school_data[i].school);
        if(school_data[i] != null || school_data[i] != undefined)
        {
          let obj = new Object();
          obj.school = school_data[i].school;
          obj.total = +school_data[i].total;
          obj.ranking_dinero = +school_data[i].ranking_dinero; 

          data.push(obj);    
       }
      
    }
	

    //console.log(data);

    

    //barchar
    //var svg = d3.select( DOM.svg( width, 500 ) ),
    //var svg = d3.select("#barchar");

    //console.log(svg);

    var svg1 = d3.select('#barchar');

    svg1.selectAll("*").remove();
	
	if(data.length <= 0)
    {
      return;
    }


    var svg = d3.select('#barchar').append('svg'), //.attr('width',500).attr('height',500),   
        margin = { top: 50, right: 30, bottom: 30, left: 40 },
        iwidth = 1200 - margin.left - margin.right,
        iheight = 400 - margin.top - margin.bottom,
        g = svg.append( "g" ).attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );
  
     var x0 = d3.scaleBand()
    .rangeRound( [ 0, iwidth ] )
    .paddingInner( 0.1 );
  
  var x1 = d3.scaleBand()
    .padding( 0.05 );

  var y = d3.scaleLinear()
    .rangeRound( [ iheight, 0 ] );

  var z = d3.scaleOrdinal( d3.schemeCategory10 );
  
  var divTooltip = d3.select( "body" ).append( "div" )  
    .style( "position", "absolute" )
    .style( "text-align", "center" )
    .style( "width", "100px" )
    .style( "height", "28px" )
    .style( "padding", "2px" )
    .style( "font", "12px sans-serif" )
    .style( "background", "lightsteelblue" )
    .style( "border", "0px" )
    .style( "border-radius", "8px" )
    .style( "pointer-events", "none" )
    .style( "opacity", 0 );
    
  var keys = ["total","ranking_dinero"];
  //var keys = data.columns.slice( 1 );
    
  x0.domain( data.map( d => d[ 'school' ] ) );
  x1.domain( keys ).rangeRound( [ 0, x0.bandwidth() ] );
  y.domain( [ 0, d3.max( data, function(d) { return d3.max( keys, function( key ) { return d[ key ]; } ); } ) ] ).nice();
  
  g.append( "g" )
    .selectAll( "g" )
    .data( data )
    .enter().append( "g" )
      .attr( "transform", d => "translate(" + x0( d[ 'school' ] ) + ",0)" )
    .selectAll( "rect" )
    .data( function( d ) { return keys.map( function( key ) { return { key: key, value: d[ key ] }; } ); } )
    .enter().append( "rect" )
      .attr( "class", "bar" )
      .attr( "x", d => x1( d.key ) )
      .attr( "y", d => y( d.value ) )
      .attr( "width", x1.bandwidth())
      .attr( "height", d => iheight - y( d.value ) )
      .attr( "fill", d => z( d.key ) )
      .on("mouseover", function( d ) {      
        divTooltip.transition()     
          .duration( 200 )      
          .style( "opacity", .9 );      
        divTooltip.html( d.key + "<br/>"  + d.value )   
          .style( "left", ( d3.event.pageX - 40 ) + "px" )      
          .style( "top", ( d3.event.pageY - 40 ) + "px" );
        
        d3.select( "svg" ).selectAll( "rect.bar" )
          .select( function( di ) { return di.key !== d.key ? this : null ; } )
          .transition()
             .style( "opacity", "0.2" );
        
        var line = d3.line()
          .x( dj => x0( dj[ 'school' ] ) + x1( d.key ) + ( x1.bandwidth() / 2 ) )
          .y( dj => y( dj[ d.key ] ) );
    
        g.append( "path" )
          .datum( data )
          .attr( "class", "trendline" )
          .attr( "fill", "none" )
          .attr( "stroke", z( d.key ) )
          .attr( "stroke-width", 1.5 )
          .attr( "d", line );
         
        g.selectAll( "circle" )
          .data( data ).enter()   
          .append( "circle" )
            .attr( "cx", dj => x0( dj[ 'school' ] ) + x1( d.key ) + ( x1.bandwidth() / 2 ) )
            .attr( "cy",  dj => y( dj[ d.key ] ) )
            .attr( "r", 4 )
            .attr( "class", "trendcircle" )
            .attr( "fill", z( d.key ) )
            .attr( "stroke", "#000" );
        } )                 
      .on( "mouseout", function( d ) {      
        divTooltip.transition()     
          .duration( 500 )      
          .style( "opacity", 0 );
        
        d3.select( "svg" ).selectAll( "rect" )
          .select( function( di ) { return di.key !== d.key ? this : null ; } )
          .transition()
             .style( "opacity", "1" );
        
        svg.selectAll( ".trendline" ).remove()
        svg.selectAll( "circle.trendcircle" ).remove()
      } );
  
  g.append( "g" )
      .attr( "class", "axis" )
      .attr( "transform", "translate(0," + iheight + ")" )
      .call( d3.axisBottom( x0 ) );
  
  g.append( "g" )
      .attr( "class", "axis" )
      .call( d3.axisLeft( y ).ticks( null, ".0f" ) )
    .append( "text" )
      .attr( "x", 2 )
      .attr( "y", y( y.ticks().pop() ) + 0.5 )
      .attr( "dy", "0.32em" )
      .attr( "fill", "#000" )
      .attr( "font-weight", "bold" )
      .attr( "text-anchor", "start" )
      .attr( "font-family", "sans-serif" )
      .attr( "font-size", 12 )
      .text( "Valor del ranking" );
  
  var legend = svg.append( "g" )
      .attr( "font-family", "sans-serif" )
      .attr( "font-size", 12 )
      .attr( "text-anchor", "end" )
    .selectAll( "g" )
    .data( keys.slice().reverse() )
    .enter().append( "g" )
      .attr( "transform", ( d, i ) => "translate(" + i * 20 + ",0)" );
  
  legend.append( "rect" )
    .attr( "class", "legend" )
    .attr( "x", ( d, i ) => iwidth - ( i * 150 ) )
    .attr( "width", 19 )
    .attr( "height", 19 )
    .attr( "fill", z );
  
  legend.append( "text" )
    .attr( "x", ( d, i ) => iwidth - ( i * 150 + 12 ) )
    .attr( "y", 9.5 )
    .attr( "dy", "0.32em" )
    .text( d => d );    
}