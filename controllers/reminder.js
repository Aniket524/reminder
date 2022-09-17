import Reminder from "../models/reminder.js"






export const getAllReminder = (req,res) => {
    Reminder.find({},(err,reminderList)=>{
        if(err)
        {
            console.log(err)
        }
        if(reminderList)
        {
            res.send(reminderList)
        }
    })
}


export const addReminder = async(req,res) => {
    const {reminderMsg, remindAt}=req.body;
    const reminder = await new Reminder({
        reminderMsg,
        remindAt,
        isReminded:false
    })
    reminder.save(err=>{
        if(err){
            console.log(err)
        }
        else{
            Reminder.find({},(err,reminderList)=>{
                if(err)
                {
                    console.log(err)
                }
                if(reminderList)
                {
                    res.send(reminderList)
                }
            })
        }
    })
}


export const deleteReminder = (req,res) => {
    Reminder.deleteOne({_id:req.body._id}, (err) => {
        if(err){
            console.log(err)
        }
        else{
            Reminder.find({},(err,reminderList)=>{
                if(err)
                {
                    console.log(err)
                }
                if(reminderList)
                {
                    res.send(reminderList)
                }
            })
        }
    })
}



