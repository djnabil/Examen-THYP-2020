class data {
    constructor(params) {
        var me = this;
        this.cont = params.cont ? params.cont : d3.select('body');
        this.apiUrl = params.apiUrl ? params.apiUrl : false;
        this.mode = params.mode ? params.mode : false;

        function selectData (data) {
            if (data[0].length > 1) {
                // Dans le cas d'un array contenant plusieurs item
                var dataItems = data[0];
            } else {
                // Dans le cas d'un item unique
                var dataItems = data;
            }
            return dataItems;
        }

        // Enlève les doublons
        function setData (data) {
            var dataDoublon = [];
            var dataSansDoublon = [];
            console.log(data);
            data.forEach(d => {
                dataDoublon.push(d["dcterms:subject"][0]["@value"]);
            });

            dataDoublon.forEach(d => {
                if (dataSansDoublon.indexOf(d) === -1) {
                    dataSansDoublon.push(d);
                }
            })
            return dataSansDoublon;
        }

        function showSujets(data) {
            var dataItems = selectData(data);
            var dataSansDoublon = setData(dataItems);

            var contSelect = d3.select(me.cont)
            .append("div")
            .attr("class", "dropdown")

            var button = contSelect.append("button")
                .attr("class", "btn-primary dropdown-toggle")
                .attr("type", "button")
                .attr("data-toggle", "dropdown")
                .html("Sujet");

            var dropdownMenu = contSelect.append("div")
                .attr("class", "dropdown-menu")
                .selectAll("a")
                .data(dataSansDoublon)
                .enter()
                .append("a")
                .attr("class", "dropdown-item")
                .on("click", d => {
                    console.log(d);
                    showFiltreItems(d);
                })
                .html(d => {
                    return d;
                })
            /*var contSelect = d3.select(me.cont)
                .append("div")
                .attr("class", "container")
            
            var label = contSelect.append("label")
                .attr("for", "selectSujets")
                .html("Choisissez un sujet : ")
            
            var select = contSelect.append("select")
                .attr("name", "sujet")
                .attr("id", "selectSujets")
                .on("change", function(d) {
                    var items = document.getElementsByClassName("card");
                    console.log(items);
                })
                .selectAll("option")
                .data(dataSansDoublon)
                .enter()
                .append("option")
                .attr("value", d => {
                    return d;
                })
                .html(d => {
                    return d;
                })*/
        }

        function showFiltreItems (data) {
            showItems(data);
            var cards = document.getElementsByClassName("card")
            //if ()
        }

        function showItems(data) {

            var dataItems = selectData(data);

            var cards = d3.select(me.cont)
                .attr("class", "container justify-content-around")
                .selectAll("div")
                .data(dataItems)
                .enter()
                .append("div")
                .attr("class","card w-25 m-3 d-inline-block text-center border-success");

            var cardHeader = cards.append("div")
                .attr("class", "card-header bg-dark text-white")
                .html(d => {
                    return "Titre : " + d["o:title"];
                });
            
            var cardBody = cards.append("div")
                .attr("class", "card-body p-0");

            cardBody.append("p")
                .attr("class", "border border-secondary py-0 my-0")
                .html(d => {
                    return "Id : " + d["o:id"];
                })
            cardBody.append("p")
                .attr("class", "border border-secondary py-0 my-0")
                .html(d => {
                    return "Média : <a href=\"" + d["o:media"][0]["@id"] + "\"> " +  d["o:media"][0]["@id"] + "</a>";
                })

        }

        this.getData = function(data){
            d3.queue()
            .defer(d3.json, me.apiUrl)
            .awaitAll(function(error, results) {
                if (error) throw error;
                console.log(results);

                if (me.mode == "showItems") {
                    showItems(results);
                } else if (me.mode == "showSujets") {
                    showSujets(results);
                    showFiltreItems(results);
                }
                
            });
        }

    }
}