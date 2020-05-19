import React,{useState} from 'react';
import '../../css/App.css';
import '../../css/footer.css';
import axios from "axios";
import Alert from 'react-bootstrap/Alert'

const Foot=()=>{
  const [email,setEmail]=useState("")
  const [text,setText]=useState("")
  const [ok,setOk]=useState(false)
  const [res,setRes]=useState("")

  const submithandle=(e)=>{
    e.preventDefault();
    axios.get(`https://mdzahin-mails.herokuapp.com/${email}/${text}`).then((e)=>{setRes(e);setOk(true)})
  }

  return (
    <div className="Foot">
       <footer class="footer-distributed" id="footer">
{ok ?  <Alert variant="success" onClose={() => setOk(false)} dismissible>{res}</Alert> : ""}
      <div class="footer-left">
        <h3>Zahin<span>Afsar</span></h3>
        <p class="footer-company-name">Md. Zahin Afsar &copy; 2019</p>
      </div>
      <div class="footer-right">
        <p>Contact with Me to Hire</p>
        <form onSubmit={submithandle}>
          <input type="text" name="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <textarea name="message" placeholder="Message" value={text} onChange={(e)=> setText(e.target.value)}></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </footer>
    </div>
 );
}

export default Foot;
