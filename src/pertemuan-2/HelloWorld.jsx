export default function HelloWorld(){
    const propsUserCard = {
        nama: "Goku",
        nim: "999999",
        tanggal: "2025-01-01",
        usia :"50"
    }
    return (
        <div>
            <h1>Hello World</h1>
             <img src= " ./img/apaja.jpg" width ={100}/>

            <p>Selamat Belajar ReactJs</p>
            <GreetingsBinjai/>
            <QuoteText/>
             <UserCard 
	            nama="faras" 
	            nim="1231312234"
	            tanggal={new Date().toLocaleDateString()}
	          />
              <UserCard 
	            nama="zaki" 
	            nim="234234354"
	            tanggal="20-06-2024"
	          />
                <UserCard {...propsUserCard}/>
        </div>
    )
}

function GreetingsBinjai(){
    return (
        <small> Salam dari Binjai 😊😍👌</small>
    )
}

function QuoteText() {
    const text = "Mulutmu Harimaumu";
    const text2 = "Aku ingin jadi macan";
    return (
        <div className="card">
            <hr/>
            <p>{text.toLowerCase()}</p>
            <p>{text2.toUpperCase()}</p>
        </div>
    )
}
function UserCard(props){              
    return (
        <div className="card">
            <hr/>
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
            <p>Usia: {props.usial}</p>
        </div>
    )
}