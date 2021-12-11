const mongoose=require('mongoose')



const PhoneSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    make:{
        type:String,
        
    }, model:{
        type:String,
      
    },
    color:{
        type:String,
        
    }, batteryHealth:{
        type:String,
        
    },
    mobileDetail:{
        type:String,
        
    }, condition:{
        type:String,
      
    },
    warrenty:{
        type:String,
        
    }, boxAccessories:{
        type:String,
        
    },
    os:{
        type:String,
        
    }, sim:{
        type:String,
      
    },
    frequency:{
        type:String,
        
    },screenSize:{
        type:String,
        
    }, processor:{
        type:String,
      
    },
    ram:{
        type:String,
        
    },
    memory:{
        type:String,
        
    },backCamera:{
        type:String,
        
    }, selfieCamera:{
        type:String,
      
    },
    battery:{
        type:String,
        
    },
    capacity:{
        type:String,
        
    },
    usbType:{
        type:String,
        
    },
    fingerPrint:{
        type:String,
        
    },
    description:{
        type:String,
        
    },
    price:{
        type:String,
        
    },
    images:{
type:Array
    },
    name:{
        type:String,
        
    },
    mobile:{
        type:String,
        
    },
    whatsapp:{
        type:String,
        
    },
    user:{
        type:mongoose.Types.ObjectId
    }
},{timestamps:true})

const Phones=mongoose.model("Phones",PhoneSchema)

module.exports=Phones