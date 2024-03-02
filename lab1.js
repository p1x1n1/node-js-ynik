/*1) Описать объект, содержащий:
а) поле – массив, поле строкового типа, поле целого типа, возможно добавление других необходимых полей;
б) конструктор, позволяющий полностью инициализировать объект;
в) методы доступа к элементам массивов и к полям;
г) функциональный метод, реализующий некоторую функцию от элементов массива и полей объектов классов (арифметическую, логическую, конкатенацию и т.п.).

2) Организовать массив объектов, заполненный описанными выше объектами. Выполнить следующие действия:
а) вывести полную информацию обо всех объектах массива;
б) найти в массиве объекты, функциональный метод которых возвращают одинаковый результат, поместить такие объекты в другой массив*/

function Spell(name,damage){
    return{
        name,
        damage,
    }
}
function vampire( name, skill, health ){
    this.name = name;
    this.skill = skill;
    this.health = health;

    this.getSkillEl = function(index) {
        return this.skill[index];
    },
    this.getSkill = function(){
        res="";
        for (let Spell of this.skill){
            res += Spell.name + " ";
        }
        return res;
    }
    this.getname = function() {
        return this.name;
    },

    this.getHealth = function() {
        return this.health;
    },

    this.attack = function() {
        console.log(this.name + " attacked");
        let damage = 0;
        for (let i = 0; i < this.skill.length; i++) {
            damage += this.skill[i].damage;
        }
        return damage;
    }
}

let vamp1= new vampire('Kaleb', [new Spell('bite',3), new Spell('hypnosis',10)],100);
let vamp2= new vampire('Vatore', [new Spell('bite',3), new Spell('power',12)],90);
let vamp3= new vampire('Lilit', [new Spell('bite',3), new Spell('speed',6),new Spell('nigthmare',6)],80);

let clan=[vamp1,vamp2];
clan.push(vamp3);
let similar=[];
for (let i = 0; i < clan.length; i++) {
    console.log("Vampire "+clan[i].getname()+" health: "+clan[i].getHealth()+" skill: "+clan[i].getSkill());
    for (let j = i + 1; j < clan.length; j++) {
        if (clan[i].attack() === clan[j].attack()) {
            similar.push(clan[i]);
            similar.push(clan[j]);
        }
    }
}
console.log( similar);
//console.log(clan);

