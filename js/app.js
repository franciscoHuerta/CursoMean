var scope = {
    container: document.querySelector('[data-module="app"]'),
    init(){
        this.container.innerHTML= this.template;
        scope.render();
    },
    render(){
        this.mount();
    },
    mount(){
        //Ejecutamos metodos dentro dependiendo del boton clickeado
        var dataClick = Object.keys(scope.method);
        for (i=0; i< dataClick.length; i++){
            var element=scope.container.querySelector('[data-click="'+dataClick[i]+'"]');
            
            if (element!=null){
                element.addEventListener('click',scope.method[dataClick[i]])
            }            
        }

        //Selector de segundos/minutos/horas
        var dataList = Object.keys(scope.data);
        for (i=0; i< dataList.length; i++){
            var element=document.querySelector('[data-value="'+dataList[i]+'"]')
            if (element){
                element.innerHTML=scope.data[dataList[i]];            
            }
        }        
    },
    template:`
        <article class="reloj">
        <section class="display">
            <span class="hours" data-value="hours"></span>    
            <span class="minutes" data-value="minutes"></span>
            <span class="seconds" data-value="seconds"></span>
        </section>
        <section class="controls">
            <button data-click="startClock">Start</button>
            <button data-click="pauseClock">Pause</button>
            <button data-click="stopClock">Stop</button>
        </section>
        </article>`,
    data:{seconds:0, minutes:0, hours:0},
    
    method:{
        updateClock(){
            scope.data.seconds++
            if (scope.data.seconds==60){
                scope.data.seconds=0;
                scope.data.minutes++;
                if (scope.data.minutes>60){
                    scope.data.hours++;
                    scope.data.minutes=0;
                }
            }
        },        
        startClock(){            
            if(!scope.data.clockId){
                scope.data.clockId=setInterval(function(){
                    scope.method.updateClock();                    
                    scope.render();
                },1000);
            }         
        },        
        pauseClock(){
            clearInterval(scope.data.clockId);
            scope.data.clockId=null;
        },
        stopClock(){
            clearInterval(scope.data.clockId);
            scope.data.seconds=0;
            scope.data.minutes=0;
            scope.data.hours=0;
            scope.data.clockId=null;
            scope.render();
        }
    },    
    }
    scope.init();