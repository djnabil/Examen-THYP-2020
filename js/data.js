class data {
    constructor(params) {
        var me = this;
        this.cont = params.cont ? params.cont : d3.select('body');
        this.apiUrl = params.apiUrl ? params.apiUrl : false;
        this.waitUrl = params.waitUrl ? params.waitUrl : false;
        this.data = params.data ? params.data : {}; 
        this.idVocab = 0;
        var vocab, tables, classes, properties, items=[], omekaQuery=[],divWait
        , propsForOmekaType = {
            'o:ResourceClass':['@id','o:id','o:label','o:term']
            ,'o:Property':['@id','o:id','o:label','o:term']
            ,'o:Item':['@id','o:id','o:title','o:resource_class','properties']
        };

        function showItems(data) {

            if (data[0].length > 1) {
                // Dans le cas d'un array contenant plusieurs item
                var dataItems = data[0];
            } else {
                // Dans le cas d'un item unique
                var dataItems = data;
            }

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
                showItems(results);    
            });
        }

    }
}