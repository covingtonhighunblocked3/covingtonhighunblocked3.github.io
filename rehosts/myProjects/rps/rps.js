$(document).ready(runProgram)

function runProgram() {

    var _ = {
        update: {
            single: function (object) {
                object.data = {
                    position: {
                        x: functions.game.set.position.x(object),
                        y: functions.game.set.position.y(object),
                    },
                    middle: {
                        x: functions.game.get.middle.x(object),
                        y: functions.game.get.middle.y(object),
                    },
                    sides: function () {
                        return (functions.game.get.sides(object))
                    },
                    position: {
                        x: _.html.get.position.x(player),
                        y: _.html.get.position.y(player),
                    },
                    middle: {
                        x: _.game.get.middle.x(player),
                        y: _.game.get.middle.y(player),
                    },
                    sides: function () {
                        return (_.game.get.sides(player))
                    },
                    speed: {
                        x: _.game.set.velocity.x(player, 0),
                        y: _.game.set.velocity.y(player, 0),
                    },
                }
            },
        },
        html: {
            set: {
                position: {
                    x: function (object) {
                        $(object.html.id).css('left', object.data.position.x);
                    },
                    y: function (object) {
                        $(object.html.id).css('top', object.data.position.y)
                    },
                },
                color: function (object, color) {
                    $(object.html.id).attr('color', color)
                },
            },
            get: {
                position: {
                    x: function (object) {
                        return ($(object.html.id).css('left'))
                    },
                    y: function (object) {
                        return ($(object.html.id).css('top'))
                    },
                },
                width: function (object) {
                    return (parseFloat($(object.html.id).css('width')))
                },
                height: function (object) {
                    return (parseFloat($(object.html.id).css('height')))
                },
            },
        },
        game: {
            set: {
                position: {
                    x: function (object) {
                        object.game.position.x += object.game.speed.x;
                    },
                    y: function (object) {
                        object.game.position.y += object.game.speed.y;
                    },
                },
                velocity: {
                    x: function (object, speed) {
                        object.game.speed.x = speed;
                    },
                    y: function (object, speed) {
                        object.game.speed.y = speed;
                    },
                }
            },
            get: {
                distance: function (obj1, obj2, xy) {
                    var distance = Math.abs(obj1.game.middle[xy] - obj2.game.middle[xy]);
                    return distance;
                },
                collisionStatus: function (obj1, obj2, side1, side2) {
                    this.sides(obj1);
                    this.sides(obj2);
                    if (obj1.game.sides[side1] <= obj2.game.sides[side2]) {
                        // collision detected!
                        return true;
                    };
                },
                sides: function (object) {
                    //find the sides of any given object by using its width, height, x, and y
                    var temp = {
                        right: object.game.position.x + object.html.width,
                        left: object.game.position.x,
                        top: object.game.position.y,
                        bottom: object.game.position.y + object.html.height,
                    };
                    return temp
                },
                middle: {
                    x: function (object) {
                        return (object.game.position.x + (object.html.width / 2))
                    },
                    y: function (object) {
                        return (object.game.position.y + (object.html.height / 2))
                    },
                },
            },
        },
    };
    //var interval = setInterval(update, 1000)
    var board = {
        html: {
            id: "#board",
            width: parseFloat($("#board").css('width')),
            height: parseFloat($("#board").css('height')),
            x: 0,
            y: 0,
        },
    }
    console.log(board)
    var game = {
        players: {
            names: [],
            all: [],
        },
    };

    function objsToArray() {
        var newArr = []
        var names = game.players
        var length = names.length
        for (var i = 0; i < length; i++) {
            var entry = game.names[i]
            //console.log(entry)
            newArr.push(game.all[entry])
        }
        return (newArr);
    }

    function newPlayer(parent, type) {
        var player = {
            html: {
                id: ("#player" + game.players.names.length),
                src: "img/" + type + ".png",
                content: ("<img class='sprite' id='" + ("player" + game.players.names.length) + "' src='" + "img/" + type + ".png" + "'>"),
                width: parseFloat($(".sprite").css('width')),
                height: parseFloat($(".sprite").css('height')),
            },
            data: {
                id: ("player" + game.players.names.length),
                position: {
                    x: 0,
                    y: 0,
                },
                middle: {
                    x: 0,
                    y: 0,
                },
                sides: {

                },
                speed: {
                    x: 0,
                    y: 0,
                },
            },
            type: type,
        };
        appendNew(parent, player.html.content)
        game.players.names.push(player.data.id)
        game.players.all.push(player)
    }

    function appendNew(parent, content) {
        $(parent).append(content)
    }

    function changePosition(id, x, y) {
        //console.log("moving")
        $(id).css('left', x)
        $(id).css('top', y)
    }
    //changePosition("#player0", 87, 90)
    function placeRandom(amount) {
        for (var i = 0; i < amount; i++) {
            var type = getRandom(3)
            if (type === 1) {
                type = "rock"
            } else if (type === 2) {
                type = "paper"
            } else if (type === 3) {
                type = "scissors"
            } else {
                type = "paper"
            }
            newPlayer("#board", type)
            var t = game.players.names.length - 1;
            var newId = (game.players.names[t])
            var player = game.players.all[t]
            var x = getRandom(board.html.width - _.html.get.width(player))
            var y = getRandom(board.html.height - _.html.get.height(player))
            changePosition(player.html.id, x, y)
        }
    }
    placeRandom(100)

    function getRandom(max) {
        return (Math.round(Math.random() * max))
    }
    function checkCollisions (obj1, obj2) {
        
    }

    function wait(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    function toggle(variable) {
        variable = variable ? false : true;
        console.log(variable);
        alert(variable)
    }
    //alert($("#board").css('width'))
}