import React, {useEffect, useState} from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API || 'http://localhost:5000/api';

export default function Landing(){
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contact, setContact] = useState({fullName:'',email:'',mobile:'',city:''});
  const [subscribeEmail, setSubscribeEmail] = useState('');

  useEffect(()=>{ fetchAll(); },[]);
  async function fetchAll(){
    try{
      const [pRes, cRes] = await Promise.all([
        axios.get(API+'/projects'),
        axios.get(API+'/clients')
      ]);
      setProjects(pRes.data);
      setClients(cRes.data);
    }catch(err){ console.error(err) }
  }

  async function submitContact(e){
    e.preventDefault();
    try{
      await axios.post(API+'/contacts', contact);
      alert('Contact submitted — thank you!');
      setContact({fullName:'',email:'',mobile:'',city:''});
    }catch(err){ alert('Error'); }
  }

  async function subscribe(e){
    e.preventDefault();
    try{
      await axios.post(API+'/subscribes', {email: subscribeEmail});
      alert('Subscribed!');
      setSubscribeEmail('');
    }catch(err){ alert('Already subscribed or error'); }
  }

  return (
    <div className="container">
      <div className="hero card">
        <div className="left">
          <h1 style={{color:'#fff'}}>Creative Projects, Happy Clients</h1>
          <p className="small">A demo landing page built to match the assignment's reference — dynamic content fetched from backend.</p>
          <div style={{marginTop:12}}>
            <button className="btn">Explore Projects</button>
          </div>
        </div>
        <div className="right">
          <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80" alt="hero" style={{width:'100%',borderRadius:10}}/>
        </div>
      </div>

      <section style={{marginTop:24}}>
        <div className="section-title"><h3>Our Projects</h3></div>
        <div className="projects-grid">
          {projects.length? projects.map(p=>(
            <div key={p._id} className="project card">
              <img src={p.imageUrl || 'https://via.placeholder.com/450x350'} alt={p.name}/>
              <h4>{p.name}</h4>
              <p className="small">{p.description?.slice(0,120)}</p>
              <div style={{marginTop:'auto'}}><button className="btn">Read More</button></div>
            </div>
          )): <div className="card">No projects yet. Add from admin panel.</div>}
        </div>
      </section>

      <section style={{marginTop:24}}>
        <div className="section-title"><h3>Happy Clients</h3></div>
        <div className="clients-list">
          {clients.length? clients.map(c=>(
            <div key={c._id} className="client card">
              <img src={c.imageUrl || 'https://via.placeholder.com/450x350'} alt={c.name}/>
              <h4>{c.name} <span className="small">— {c.designation}</span></h4>
              <p className="small">{c.description?.slice(0,140)}</p>
            </div>
          )): <div className="card">No clients yet.</div>}
        </div>
      </section>

      <section style={{marginTop:24, display:'flex', gap:16}}>
        <div style={{flex:1}} className="card">
          <h4>Contact Us</h4>
          <form onSubmit={submitContact} style={{display:'flex',flexDirection:'column',gap:8}}>
            <input className="input" placeholder="Full Name" value={contact.fullName} onChange={e=>setContact({...contact, fullName:e.target.value})} required/>
            <input className="input" placeholder="Email" value={contact.email} onChange={e=>setContact({...contact, email:e.target.value})} required/>
            <input className="input" placeholder="Mobile" value={contact.mobile} onChange={e=>setContact({...contact, mobile:e.target.value})} required/>
            <input className="input" placeholder="City" value={contact.city} onChange={e=>setContact({...contact, city:e.target.value})}/>
            <button className="btn" type="submit">Submit</button>
          </form>
        </div>

        <div style={{width:320}} className="card">
          <h4>Newsletter</h4>
          <form onSubmit={subscribe}>
            <input className="input" placeholder="Your email" value={subscribeEmail} onChange={e=>setSubscribeEmail(e.target.value)} required/>
            <div className="footer-sub"><button className="btn" type="submit">Subscribe</button><span className="small">No spam — unsubscribe anytime.</span></div>
          </form>
        </div>
      </section>
    </div>
  );
}
