import React, {useEffect, useState} from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API || 'http://localhost:5000/api';

export default function Admin(){
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subs, setSubs] = useState([]);

  const [projForm, setProjForm] = useState({name:'',description:'',image:null});
  const [clientForm, setClientForm] = useState({name:'',designation:'',description:'',image:null});

  useEffect(()=>{ fetchAll(); },[]);
  async function fetchAll(){
    try{
      const [pRes, cRes, conRes, sRes] = await Promise.all([
        axios.get(API+'/projects'),
        axios.get(API+'/clients'),
        axios.get(API+'/contacts'),
        axios.get(API+'/subscribes'),
      ]);
      setProjects(pRes.data);
      setClients(cRes.data);
      setContacts(conRes.data);
      setSubs(sRes.data);
    }catch(err){ console.error(err) }
  }

  async function addProject(e){
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', projForm.name);
    fd.append('description', projForm.description);
    if(projForm.image) fd.append('image', projForm.image);
    await axios.post(API+'/projects', fd, { headers: {'Content-Type':'multipart/form-data'}});
    setProjForm({name:'',description:'',image:null});
    fetchAll();
  }

  async function addClient(e){
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', clientForm.name);
    fd.append('designation', clientForm.designation);
    fd.append('description', clientForm.description);
    if(clientForm.image) fd.append('image', clientForm.image);
    await axios.post(API+'/clients', fd, { headers: {'Content-Type':'multipart/form-data'}});
    setClientForm({name:'',designation:'',description:'',image:null});
    fetchAll();
  }

  return (
    <div className="container admin-panel">
      <h2>Admin Panel</h2>
      <div className="admin-grid">
        <div>
          <div className="card">
            <h4>Add Project</h4>
            <form className="form" onSubmit={addProject}>
              <input className="input" placeholder="Name" value={projForm.name} onChange={e=>setProjForm({...projForm, name:e.target.value})} required/>
              <input className="input" placeholder="Description" value={projForm.description} onChange={e=>setProjForm({...projForm, description:e.target.value})}/>
              <input type="file" accept="image/*" onChange={e=>setProjForm({...projForm, image:e.target.files[0]})}/>
              <button className="btn" type="submit">Add Project</button>
            </form>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h4>Add Client</h4>
            <form className="form" onSubmit={addClient}>
              <input className="input" placeholder="Name" value={clientForm.name} onChange={e=>setClientForm({...clientForm, name:e.target.value})} required/>
              <input className="input" placeholder="Designation" value={clientForm.designation} onChange={e=>setClientForm({...clientForm, designation:e.target.value})}/>
              <input className="input" placeholder="Description" value={clientForm.description} onChange={e=>setClientForm({...clientForm, description:e.target.value})}/>
              <input type="file" accept="image/*" onChange={e=>setClientForm({...clientForm, image:e.target.files[0]})}/>
              <button className="btn" type="submit">Add Client</button>
            </form>
          </div>
        </div>

        <div>
          <div className="card">
            <h4>Contact Form Submissions</h4>
            <div className="list">
              {contacts.map(c=>(
                <div key={c._id} style={{padding:8,borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                  <strong>{c.fullName}</strong> — <span className="small">{c.email} • {c.mobile} • {c.city}</span>
                </div>
              ))}
              {!contacts.length && <div className="small">No contacts yet.</div>}
            </div>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h4>Subscribed Emails</h4>
            <div className="list">
              {subs.map(s=>(
                <div key={s._id} style={{padding:8,borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                  {s.email} <span className="small">({new Date(s.createdAt).toLocaleString()})</span>
                </div>
              ))}
              {!subs.length && <div className="small">No subscribers yet.</div>}
            </div>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h4>Existing Projects & Clients</h4>
            <div className="list">
              <strong>Projects:</strong>
              {projects.map(p=> <div key={p._id} style={{padding:8}}>{p.name}</div>)}
              <strong style={{marginTop:8,display:'block'}}>Clients:</strong>
              {clients.map(c=> <div key={c._id} style={{padding:8}}>{c.name} — {c.designation}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
