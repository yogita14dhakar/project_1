// filter logic
let filters = document.getElementsByClassName("filter");
for(let filter of filters){
    filter.addEventListener("click", ()=>{
        let id = filter.id;
        let count = -1;
        for(listing of allListing){
            count++;
            if(!listing.filters.includes(id)){
                document.getElementsByClassName("listing-link")[count].style.display="none";
            }
            else{
                document.getElementsByClassName("listing-link")[count].style.display="";
            }
        }
    });
}

// taxSwitch toggle logic
let taxSwitch = document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    for(info of taxInfo){
        if(info.style.display != "inline"){
            info.style.display = "inline";
        }else{
            info.style.display = "none";
        }
    }
});

// search logic
let search = document.querySelector(".search-inp");
let suggestions_container = document.getElementById("suggestions");
search.addEventListener("input", function() {
    let query = search.value.toLowerCase();
    suggestions_container.innerHTML = '';
    suggestions_container.style.display="block";
// auto complete logic
    if(query){
            const filtered_Suggestion = allListing.filter(listing =>(
                listing.title.toLowerCase().includes(query) || listing.location.toLowerCase().includes(query)
            ));
        
            filtered_Suggestion.forEach(listing => {        
              const div = document.createElement("div");
              div.className = "suggestion_item";
              if(listing.title.toLowerCase().includes(query)){
                div.textContent = listing.title;
              }else if(listing.location.toLowerCase().includes(query)){
                div.textContent = listing.location;
              }
              
              div.addEventListener("click", ()=>{
                if(listing.title.toLowerCase().includes(query)){
                    search.value = listing.title;
                }else if(listing.location.toLowerCase().includes(query)){
                    search.value = listing.location;
                }
                suggestions_container.innerHTML = '';
                suggestions_container.style.display = "block";
              });
              
              suggestions_container.appendChild(div)
            });  
    }
});
document.addEventListener('click', function(event) {
    if (!search.contains(event.target) && !suggestions_container.contains(event.target)) {
      suggestions_container.innerHTML = '';
      suggestions_container.style.display = "block";
    }
    else{
        suggestions_container.style.display = "none";
    }
});
function getAction(form){
    let idxCount = -1;
    for(listing of allListing){
        idxCount++;
        if(search.value.toLowerCase() === listing.country.toLowerCase()){
            form.action = `/listings/${listing.country}`
        }
        else if(search.value.toLowerCase() === listing.title.toLowerCase() || search.value.toLowerCase() === listing.location.toLowerCase()){
            form.action = `/listings/${listing._id}`;
        }else{
            form.action = `/listings/random`;
        }
    }
}

