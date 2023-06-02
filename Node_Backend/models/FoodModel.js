import {Sequelize} from "sequelize";
import db from "../config/Database.js";
 
const {DataTypes} = Sequelize;
 
const Foods = db.define('foods',{
    food_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    food_name: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    food_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    food_img:{
        type:DataTypes.STRING,
        allowNull: true,
    },
    food_desc:{
        type:DataTypes.STRING,
        allowNull: true,
    },
},{
    freezeTableName:true
});
 
export default Foods;
 
(async()=>{
    await db.sync();
})();