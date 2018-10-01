$(document).ready( function(){
  var progressbar = document.querySelectorAll('.progress-bar')
  var status = document.querySelectorAll('.status')
  $.each(progressbar,function(){
    var p = $(this).attr('aria-valuenow');
    $(this).width(`${p}%`);
    if(p<=20){
      $(this).addClass(`progress-bar-danger`)
    }
    else if(p>20 && p<=50){
      $(this).addClass(`progress-bar-warning}`)
    }
    else if(p>50 && p<=80){
      $(this).addClass(`progress-bar-info`)
    }
    else{
      $(this).addClass(`progress-bar-success`);
    }
  })
  $.each(status,function(){
    var value = $(this).text();
    if(value==="started"){
      $(this).addClass('btn-info')
    }
    else if(value==='pending'){
      $(this).addClass('btn-default')
    }
    else if(value==='completed'){
      $(this).addClass('btn-success')
    }
    else if(value==='paused'){
      $(this).addClass('btn-warning')
    }
  })

})
