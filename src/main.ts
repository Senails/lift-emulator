import { createApp } from 'vue';
import App from './app/App.vue';
import './global.css';

createApp(App).mount('#app')


// class Tot {
//     name: string = "roar";
//     val: number = 6;

//     Roar(){
//         console.log(this.name);
//     }
// }
// class Tit extends Tot{
//     name: string = "roar";
//     val: number = 6;

//     Roar(){
//         console.log(this.name);
//     }
// }

// class User extends Tit{
//     name:string;

//     constructor(name: string = "vasya") {
//         super();
//         this.name = name;
//     }
//     sayHi() {
//         alert(this.name);
//     }
  
// }

// const tyt = new User();

// console.log(User.prototype);
// console.log(User.prototype.__proto__);
// console.log(tyt.val)

// tyt.Roar();

