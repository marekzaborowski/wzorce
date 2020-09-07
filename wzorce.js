
// Singleton
function Singleton() {
	if (typeof Singleton.instance === "object") {  
    	 return Singleton.instance;    
    	 }
	
	 Singleton.instance = this;
	  return this;

	 }

var obj1 = new Singleton();
var obj2 = new Singleton();

console.log(obj1 === obj2)
console.log(typeof Singleton.instance)

Singleton()



// Factory
function CarMaker() {

}
	CarMaker.prototype.drive = function () {   
		return "Samochód ma " + this.doors + " drzwi";
	};

	CarMaker.factory = function (type) {    
		var constr = type,        
		newcar;

	if (typeof CarMaker[constr] !== "function") {        

		throw {

	      name: "Błąd",          
	      message: constr + " nie istnieje"        
	  };    
}
	
	if (typeof CarMaker[constr].prototype.drive !== "function") { 
	       CarMaker[constr].prototype = new CarMaker();    
	       }

	       newcar = new CarMaker[constr]();
	       return newcar;
	   };

	       CarMaker.Compact = function () {    
	       	this.doors = 4;
	       };

	       CarMaker.Convertible = function () {    
	       	this.doors = 2;
	       };
	       	CarMaker.SUV = function () {    
	       		this.doors = 7;
	       };
CarMaker()

var corolla = CarMaker.factory('Compact');
console.log(corolla)



// Iterator
var iterator = function() {

	var index = 0,
		data = [1,2,3,4,5],
		length = data.length


	return {

		next : function () {
			var element;
			if (!this.hasNext()) {
				return null
			}
			element = data[index];
			index = index + 2;
			return element
		},

		hasNext : function() {
			return index < length;
		}
	}
}();

var element
while (element = iterator.next()){
	console.log(element)
}



// Dekorator
var User = function(name) {
    this.name = name;
 
}
 
var Decorator = function(user, street, city) {
    this.user = user;
    this.name = user.name;  
    this.street = street;
    this.city = city;
 
    this.say = function() {
        return ("Dekorator użytkownika: " + this.name + ", " +
                   this.street + ", " + this.city);
    };
}

function info() {
	var user = new User('Marek')

	var decorator = new Decorator(user, 'Grunwaldzka', 'Gdańsk')
	console.log(decorator.say())

}
info()



// Fasada
var Mortgage = function(name) {
    this.name = name;
}
 
Mortgage.prototype = {
 
    applyFor: function(amount) {
       
        var result = "zezwolenie";
        if (!new Bank().verify(this.name, amount)) {
            result = "odrzucenie";
        } else if (!new Credit().get(this.name)) {
            result = "odrzucenie";
        } else if (!new Background().check(this.name)) {
            result = "odrzucenie";
        }
        return this.name + " otrzymał " + result +
               " na " + amount + " kredytu hipotecznego";
    }
}
 
var Bank = function() {
    this.verify = function(name, amount) {
        return true;
    }
}
 
var Credit = function() {
    this.get = function(name) {
        return true;
    }
}
 
var Background = function() {
    this.check = function(name) {
        return true;
    }
}
 
function run() {
    var mortgage = new Mortgage("Marek Z");
    var result = mortgage.applyFor("$100,000");
 
 	console.log(result)
}

run()



// Mediator
class UserChat {
  constructor(nick) {
    this.nick = nick;
    this.chatroom = null;
  }

  addToChatroom(chatroom) {
    this.chatroom = chatroom;
  }

  sendMessage(message, to) {
    this.chatroom.send(message, this, to);
  }

  receive(message, from, type) {
    console.log(
      `[Do ${this.nick}] Nowa ${type} wiadomość od ${from.nick}: ${message}`
    );
  }
}
class Chatroom {
  constructor() {
    this.participants = {};
  }

  join(participant) {
    this.participants[participant.nick] = participant;
    participant.addToChatroom(this);
  }

  send(message, from, to) {
    if (to) {
      to.receive(message, from, "prywatna");
    } else {
      for (const key in this.participants) {
        if (this.participants[key] !== from) {
          this.participants[key].receive(message, from, "publiczna");
        }
      }
    }
  }
}

const chatroom = new Chatroom();

const jan = new UserChat("Jan");
const aga = new UserChat("Aga");

chatroom.join(jan);
chatroom.join(aga);

jan.sendMessage("Czy znacie jakieś fajne filmy?");
aga.sendMessage("Sprzedam Opla!");
jan.sendMessage("Aga, chyba nie ten kanał...", aga);



// Memento
var Person = function(name, street, city, state) {
        this.name = name;
        this.street = street;
        this.city = city;
        this.state = state;
    }
     
Person.prototype = {
     
    hydrate: function() {
            var memento = JSON.stringify(this);
            return memento;
        },
     
    dehydrate: function(memento) {
            var m = JSON.parse(memento);
            this.name = m.name;
            this.street = m.street;
            this.city = m.city;
            this.state = m.state;
        }
    }
     
var CareTaker = function() {
        this.mementos = {};
     
        this.add = function(key, memento) {
            this.mementos[key] = memento;
        },
     
        this.get = function(key) {
            return this.mementos[key];
        }
    }
     
     
function start() {
        var mateusz = new Person("Mateusz F", "Świętojańska", "Gdynia", "GA");
        var jan = new Person("Janek W", "Słowackiego", "Gdańsk", "GD");
        var caretaker = new CareTaker();
     
        caretaker.add(1, mateusz.hydrate());
        caretaker.add(2, jan.hydrate());
     
        mateusz.name = "King Kong";
        jan.name = "Superman";

        mateusz.dehydrate(caretaker.get(1));
        jan.dehydrate(caretaker.get(2));
    
     
        console.log(mateusz.hydrate())
        console.log(jan.hydrate())
    };

start()



// Stan
var TrafficLight = function () {
        var count = 0;
        var currentState = new Red(this);
     
        this.change = function (state) {
            if (count++ >= 10) return;
            currentState = state;
            currentState.go();
        };
     
        this.start = function () {
            currentState.go();
        };
    }
     
var Red = function (light) {
        this.light = light;
     
        this.go = function () {
            console.log("Czerwony --> 1 minuta");
            light.change(new Green(light));
        }
    };
     
var Yellow = function (light) {
        this.light = light;
     
        this.go = function () {
            console.log("Zółty --> 10 sekund");
            light.change(new Red(light));
        }
    };
     
var Green = function (light) {
        this.light = light;
     
        this.go = function () {
            console.log("Zielony --> 1 minuta");
            light.change(new Yellow(light));
        }
    };
     
     
function show() {
        var light = new TrafficLight();
        light.start();
       
 }

show()



// Pełnomocnik
function GeoCoder() {
     
        this.getLatLng = function(address) {
            
            if (address === "Amsterdam") {
                return "52.3700° N, 4.8900° E";
            } else if (address === "Londyn") {
                return "51.5171° N, 0.1062° W";
            } else if (address === "Paryż") {
                return "48.8742° N, 2.3470° E";
            } else if (address === "Berlin") {
                return "52.5233° N, 13.4127° E";
            } else {
                return "";
            }
        };
    }
     
function GeoProxy() {
        var geocoder = new GeoCoder();
        var geocache = {};
     
        return {
            getLatLng: function(address) {
                if (!geocache[address]) {
                    geocache[address] = geocoder.getLatLng(address);
                }
                console.log(address + ": " + geocache[address]);
                return geocache[address];
            },
        };
    };
     
function geoShow() {
        var geo = new GeoProxy();
     
        geo.getLatLng("Paryż");
        geo.getLatLng("Amsterdam");
        geo.getLatLng("Londyn");
    }

geoShow()



// Obserwator
function calc() {
    let sum = 0;
    performance.measure('sum');
    for( let i = 0; i <= 50000; i++ ) { 
        sum += i 
    } 
    performance.measure('sum');
} 

const observer = new PerformanceObserver( list => {
    const entries = list.getEntries();
    console.log( entries[1].duration - entries[0].duration )
} );

observer.observe( { entryTypes: ['measure'] } );

calc()