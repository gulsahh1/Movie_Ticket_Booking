const container =document.querySelector('.container');
const count=document.getElementById('count');
const amount = document.getElementById('amount');
const select =document.getElementById('movie');
const seats = document.querySelectorAll('.seats:not(.reserved)');

getFromLocalStorage();
movieToTal();

container.addEventListener('click',function(e){
   if (e.target.classList.contains('seats') && !e.target.classList.contains('reserved')) // classListesinin içinde seats varsa sec reserved  olanları secme
    {
      e.target.classList.toggle('selected'); // toggle boş olanları seçebiliyoruz seçili olanları silebiliyoruz

      movieToTal();

   }
});

select.addEventListener('change',function(e){
    movieToTal();
});

function movieToTal(){
    let selectedSeats = container.querySelectorAll('.seats.selected'); // seats clasına ait divlerin sayısını alıyoruz.
   
    let selectedSeatArr = [];
    let seatArr=[];

    selectedSeats.forEach(function(seat){
        selectedSeatArr.push(seat);
    });

    seats.forEach(function(seat){
        seatArr.push(seat);
    });

    let selectedSeatIndex = selectedSeatArr.map(function(seat){
        return seatArr.indexOf(seat);
    });

    let selectedSeatCount = selectedSeats.length;
    count.innerText =selectedSeatCount ;
    amount.innerText = selectedSeatCount * select.value; 

    saveToLocalStorage(selectedSeatIndex);
};

function getFromLocalStorage(){
     const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
     const selectedMovieIndex =localStorage.getItem('selectedMovieIndex');

     if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function(seat, index){
           if (selectedSeats.indexOf(index) > -1) {
               seat.classList.add('selected');
           }
        })
     }
 

     if (selectedMovieIndex != null) {
        select.selectedIndex =selectedMovieIndex;
     }
};

function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
};


