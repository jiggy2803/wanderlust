const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");

let listingSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: String,
    image:{
        type:String,
        default:"https://unsplash.com/photos/green-plants-on-brown-concrete-building-KLOW1bD616Y ",
        set:(v)=> v===" " ? 
        "https://unsplash.com/photos/green-plants-on-brown-concrete-building-KLOW1bD616Y "
        :v,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});
// this post refer to pre(before) , post(after) middlewares
listingSchema.post("findOneAndDelete",async(req,res)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
