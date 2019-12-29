import React, { Component } from 'react';

class Message extends Component {
    state = { 
        data: [{ id: 1, value: 0, Message: "Hi" }],

     }
    render() { 
        return ( 

            <div>
                <h1>Sneaky Chat</h1>

                <button
                    className="btn btn-primary btn-sm m-2">
                </button>

                <form id="userForm">
                    <label>Enter Message</label>
                    <textarea class="form-control" id="message"></textarea>
                    <br />
                    <input
                    type="submit"
                    class="btn btn-primary"
                    value="Send Message"
                    />
                </form>



            </div>
         );
    }
}


// addInfo(){
    
    
// } 
 
export default Message;