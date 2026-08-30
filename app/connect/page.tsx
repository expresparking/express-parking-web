"use client";

export default function ConnectPage() {
  const shareCard = async () => {
    const data = { title: "Nebyat Shewaye | Express Parking & Mobility", text: "Nebyat Shewaye, CEO — Express Parking & Mobility", url: window.location.href };
    if (navigator.share) { try { await navigator.share(data); } catch {} }
    else { await navigator.clipboard.writeText(window.location.href); alert("Card link copied"); }
  };

  return (
    <main style={{position:"fixed",inset:0,zIndex:99999,overflowY:"auto",background:"#f5f5f3",display:"grid",placeItems:"center",padding:"18px",fontFamily:"Inter,Arial,Helvetica,sans-serif",color:"#191b1f"}}>
      <section style={{width:"min(100%,420px)",background:"#fff",border:"1px solid #ececea",borderRadius:28,padding:"29px 23px 20px",boxShadow:"0 14px 40px rgba(0,0,0,.06)",textAlign:"center"}}>
        <img src="/images/express-x-logo.png" alt="Express Parking" style={{width:58,height:"auto",margin:"0 auto 8px"}} />
        <div style={{fontSize:29,fontWeight:600,letterSpacing:4,marginTop:8}}>EXPRESS</div>
        <div style={{fontSize:12,fontWeight:500,letterSpacing:3,color:"#ff5a00",marginTop:4}}>PARKING &amp; MOBILITY</div>
        <div style={{marginTop:10,fontSize:11,letterSpacing:1.8,color:"#555"}}>EST. 2004 &nbsp; | &nbsp; CONNECTICUT</div>
        <div style={{width:38,height:2,background:"#ff5a00",margin:"20px auto"}} />
        <h1 style={{fontSize:30,fontWeight:500,margin:0}}>Nebyat Shewaye</h1>
        <div style={{color:"#ff5a00",fontWeight:500,fontSize:12,letterSpacing:1.5,marginTop:6}}>CEO</div>
        <div style={{fontSize:14,marginTop:6,color:"#414448"}}>Express Parking &amp; Mobility</div>
        <div style={{fontSize:12,fontWeight:500,letterSpacing:1.1,color:"#173c30",margin:"22px 0 16px"}}>PARKING MANAGEMENT &amp; MOBILITY SOLUTIONS</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          <a href="tel:+12039410954" style={primary}>Call</a>
          <a href="mailto:nebyat@expresparking.com" style={primary}>Email</a>
          <a href="/nebyat-shewaye.vcf" download style={light}>Save Contact</a>
        </div>
        <a href="https://expresparking.com" style={{...light,marginTop:10,minHeight:48}}>expresparking.com</a>
        <div style={{margin:"20px 0 5px",padding:"16px 4px",borderTop:"1px solid #e9e9e6",borderBottom:"1px solid #e9e9e6",display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"9px 13px",fontSize:11,color:"#39413d"}}>
          <span>Garages</span><span>Surface Lots</span><span>Valet</span><span>Parking Ambassadors</span><span>Events</span><span style={{color:"#4c7b34"}}>Velor Car Care</span>
        </div>
        <div style={{marginTop:17}}><div style={{fontSize:10.5,letterSpacing:1.5,color:"#666",marginBottom:10}}>SHARE CONTACT</div><button onClick={shareCard} style={{color:"#ff5a00",border:"1px solid #f0c6ae",borderRadius:12,padding:"11px 18px",fontSize:12,fontWeight:500,background:"#fff",cursor:"pointer"}}>Share this card</button></div>
        <div style={{color:"#666b70",fontSize:10.5,marginTop:15,lineHeight:1.6}}>Office (203) 887-5411 &nbsp; • &nbsp; Mobile (203) 941-0954<br/>nebyat@expresparking.com</div>
        <div style={{margin:"20px -23px -20px",background:"#173c30",color:"#fff",padding:"14px 18px",borderRadius:"0 0 28px 28px",fontSize:10.5}}>Connecticut owned · Professional parking management since 2004</div>
      </section>
    </main>
  );
}

const primary = {display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",minHeight:54,borderRadius:12,fontWeight:500,fontSize:12,border:"1px solid #173c30",padding:8,textAlign:"center" as const,background:"#173c30",color:"white"};
const light = {display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",minHeight:54,borderRadius:12,fontWeight:500,fontSize:12,border:"1px solid #173c30",padding:8,textAlign:"center" as const,background:"white",color:"#173c30"};
