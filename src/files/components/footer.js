import React from 'react';
import '../../css/App.css';
import '../../css/footer.css';

const Foot=()=>{

  return (
    <div className="Foot">
       <footer class="footer-distributed" id="footer">
      <div class="footer-left">
        <h3>Zahin<span>Afsar</span></h3>
        <p class="footer-company-name">Md. Zahin Afsar &copy; 2019</p>
      </div>
      <div class="footer-right">
        <p>Contact Me</p>
        <form action="#" method="post">
          <input type="text" name="email" placeholder="Email" />
          <textarea name="message" placeholder="Message"></textarea>
          <button>Send</button>
        </form>
      </div>
    </footer>
    </div>
 );
}

export default Foot;