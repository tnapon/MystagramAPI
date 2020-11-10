const addInfo = (res) => {
    const gallery = document.querySelector(".profile");
    let html = "";
 
        html += `
			<div class="profile-image">
				<img src="${res.profile_image.medium}">
			</div>
			<div class="profile-user-settings">
				<h1 class="profile-user-name">${res.username}</h1>
				
				
			</div>

			<div class="profile-stats">

				<ul>
					<li><span class="profile-stat-count">${res.total_photos}</span> posts</li>
					<li><span class="profile-stat-count">${res.followers_count}</span> followers</li>
					<li><span class="profile-stat-count">${res.following_count}</span> following</li>
				</ul>

			</div>

			<div class="profile-bio">

				<p><span class="profile-real-name">${res.first_name}</span> ${res.bio}</p>

			</div>

    `;

    gallery.innerHTML = html;
};

const addgallery = (res) => {
    const gallery = document.querySelector(".gallery");
    let html = "";
 res.forEach((element) => {
        html += `<div class="gallery-item" tabindex="0">
				    <img src="${element.urls.raw}" class="gallery-image">
				        <div class="gallery-item-info">
					<ul>
						<li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fa fa-heart" style="font-size:24px"></i>${element.likes}</li>
						<li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fa fa-comment" style="font-size:24px"></i></li>
					</ul>
				        </div>
			    </div>	
    `;
});
    gallery.innerHTML = html;
};

const callAPI = async (username) => {
    try {
        console.log("Username --> ", username);
        const response = await fetch("/api/searchUser", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username}),
        });
        const res = await response.json();
        //check response return from our API
        console.log("response ----> ", res);
        //6. Add images to gallery
        addInfo(res);
    } catch (error) {
        console.log("message error --->", error);
    }
};
const callPhoto = async (username) => {
    try {
        console.log("Username --> ", username,);
        const response = await fetch("/api/Photos", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username}),
        });
        const res = await response.json();
        //check response return from our API
        console.log("response ----> ", res);
        //6. Add images to gallery
        addgallery(res);
    } catch (error) {
        console.log("message error --->", error);
    }
};




const main = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');

    if(urlParams.has('username')){
        callAPI(username);
         callPhoto(username);
    }
    else{
        console.log('Please enter username')
    }



};

main();