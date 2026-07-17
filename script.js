/*==========================================================
 Delegate Wallet
 ECOFIN Committee Credit & Reward System
 Version 2
==========================================================*/

/*==========================================================
 STORAGE
==========================================================*/

const STORAGE_KEY = "delegateWalletV2";

let delegates = [];

let adminMode = false;

/*==========================================================
 SYSTEM BOOT MESSAGES
==========================================================*/

const bootMessages = [

    "Initializing Systems...",

    "Loading Delegate Wallets...",

    "Connecting Economic Network...",

    "Calibrating Committee...",

    "System Ready"

];

let bootIndex = 0;

/*==========================================================
 PERKS
==========================================================*/

const PERKS = [

    {
        name: "Skip POI",
        cost: 130
    },

    {
        name: "Skip Apology",
        cost: 200
    },

    {
        name: "Move up in GSL List",
        cost: 60
    },

    {
        name: "Initiate Rebuttal",
        cost: 70
    },

    {
        name: "Question Any Delegate",
        cost: 100
    },

    {
        name: "Pass Committee Policy (Only During Crisis)",
        cost: 400
    },

    {
        name: "Make Enforced Amendment to Draft Resolution",
        cost: 280
    },

    {
        name: "Pass Bloc's MOD Topic",
        cost: 300
    }

];

/*==========================================================
 COUNTRY FLAGS
==========================================================*/

const FLAGS = {

    "afghanistan":"🇦🇫",
    "albania":"🇦🇱",
    "algeria":"🇩🇿",
    "argentina":"🇦🇷",
    "australia":"🇦🇺",
    "austria":"🇦🇹",
    "bangladesh":"🇧🇩",
    "belgium":"🇧🇪",
    "brazil":"🇧🇷",
    "canada":"🇨🇦",
    "chile":"🇨🇱",
    "china":"🇨🇳",
    "colombia":"🇨🇴",
    "croatia":"🇭🇷",
    "cuba":"🇨🇺",
    "czech republic":"🇨🇿",
    "denmark":"🇩🇰",
    "egypt":"🇪🇬",
    "ethiopia":"🇪🇹",
    "finland":"🇫🇮",
    "france":"🇫🇷",
    "germany":"🇩🇪",
    "ghana":"🇬🇭",
    "greece":"🇬🇷",
    "hungary":"🇭🇺",
    "india":"🇮🇳",
    "indonesia":"🇮🇩",
    "iran":"🇮🇷",
    "iraq":"🇮🇶",
    "ireland":"🇮🇪",
    "israel":"🇮🇱",
    "italy":"🇮🇹",
    "japan":"🇯🇵",
    "kenya":"🇰🇪",
    "kuwait":"🇰🇼",
    "malaysia":"🇲🇾",
    "mexico":"🇲🇽",
    "morocco":"🇲🇦",
    "netherlands":"🇳🇱",
    "new zealand":"🇳🇿",
    "nigeria":"🇳🇬",
    "norway":"🇳🇴",
    "oman":"🇴🇲",
    "pakistan":"🇵🇰",
    "peru":"🇵🇪",
    "philippines":"🇵🇭",
    "poland":"🇵🇱",
    "portugal":"🇵🇹",
    "qatar":"🇶🇦",
    "romania":"🇷🇴",
    "russia":"🇷🇺",
    "saudi arabia":"🇸🇦",
    "singapore":"🇸🇬",
    "south africa":"🇿🇦",
    "south korea":"🇰🇷",
    "spain":"🇪🇸",
    "sweden":"🇸🇪",
    "switzerland":"🇨🇭",
    "thailand":"🇹🇭",
    "turkey":"🇹🇷",
    "uae":"🇦🇪",
    "uk":"🇬🇧",
    "united kingdom":"🇬🇧",
    "united states":"🇺🇸",
    "usa":"🇺🇸",
    "uruguay":"🇺🇾",
    "venezuela":"🇻🇪",
    "vietnam":"🇻🇳"

};

/*==========================================================
 HELPERS
==========================================================*/

function saveData(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(delegates)

    );

}

function loadData(){

    const saved = localStorage.getItem(STORAGE_KEY);

    if(saved){

        delegates = JSON.parse(saved);

    }

}

function flag(country){

    return FLAGS[country.toLowerCase()] || "🏳️";

}

function toast(message){

    const box = document.getElementById("toast");

    box.textContent = message;

    box.classList.add("show");

    setTimeout(()=>{

        box.classList.remove("show");

    },3000);

}

/*==========================================================
 PAGE NAVIGATION
==========================================================*/

const pages = document.querySelectorAll(".page");

function showPage(id){

    pages.forEach(page=>{

        page.classList.remove("active");

    });

    document
        .getElementById(id)
        .classList
        .add("active");

    if(id==="walletPage"){

        renderWallets();

    }

    if(id==="leaderboardPage"){

        renderLeaderboard();

    }

}

/*==========================================================
 LOADING SCREEN
==========================================================*/

function runBootSequence(){

    const overlay =
        document.getElementById("loadingOverlay");

    const text =
        document.getElementById("loaderText");

    overlay.classList.add("active");

    let i=0;

    const timer=setInterval(()=>{

        text.textContent=bootMessages[i];

        i++;

        if(i>=bootMessages.length){

            clearInterval(timer);

            setTimeout(()=>{

                overlay.classList.remove("active");

            },800);

        }

    },900);

}

function rotateLandingMessages(){

    const consoleText=
        document.getElementById("systemMessage");

    let index=0;

    consoleText.textContent=bootMessages[0];

    setInterval(()=>{

        index++;

        if(index>=bootMessages.length){

            index=0;

        }

        consoleText.textContent=
            bootMessages[index];

    },1800);

}

/*==========================================================
 ADMIN LOGIN
==========================================================*/

function loginAdmin(){

    const password=
        document
        .getElementById("adminPassword")
        .value
        .trim();

    if(password==="admin123"){

        adminMode=true;

        document
            .getElementById("adminStatus")
            .textContent=
            "Administrator Mode: Enabled";

	document.getElementById("addCountryPanel").style.display = "grid";

        toast("Administrator Mode Enabled");

    }

    else{

        adminMode=false;

        toast("Incorrect Password");

    }

}

/*==========================================================
 COUNTRY CREATION
==========================================================*/

function addCountry(){

if (!adminMode) {
    toast("Administrator access required");
    return;
}

    const input=
        document.getElementById("countryInput");

    const country=
        input.value.trim();

    if(country===""){

        toast("Enter a country name");

        return;

    }

    const exists=delegates.find(delegate=>

        delegate.name.toLowerCase()===

        country.toLowerCase()

    );

    if(exists){

        toast("Country already exists");

        return;

    }

    delegates.push({

        name:country,

        credits:100,

        frozen:false,

        purchases:[]

    });

    input.value="";

    saveData();

    renderWallets();

    renderLeaderboard();

    toast(country+" added");

}

/*==========================================================
 ENTER SIMULATION
==========================================================*/

function enterSimulation(){

    showPage("dashboardPage");

}

/*==========================================================
 BUTTON EVENTS
==========================================================*/

document
.getElementById("enterButton")
.addEventListener(

    "click",

    enterSimulation

);

document
.getElementById("adminLoginButton")
.addEventListener(

    "click",

    loginAdmin

);

document
.getElementById("addCountryButton")
.addEventListener(

    "click",

    addCountry

);

document
.getElementById("walletCard")
.addEventListener(

    "click",

    ()=>showPage("walletPage")

);

document
.getElementById("shopCard")
.addEventListener(

    "click",

    ()=>showPage("shopPage")

);

document
.getElementById("leaderboardCard")
.addEventListener(

    "click",

    ()=>showPage("leaderboardPage")

);

document

.querySelectorAll("[data-back]")

.forEach(button=>{

    button.addEventListener(

        "click",

        ()=>showPage("dashboardPage")

    );

});

/*==========================================================
 INITIALIZATION
==========================================================*/

window.addEventListener(

    "load",

    ()=>{

        loadData();

        rotateLandingMessages();

        runBootSequence();

        renderWallets();

        renderLeaderboard();

    }

);

/*==========================================================
 WALLET RENDERING
==========================================================*/

function renderWallets(){

    const container =
        document.getElementById("walletContainer");

    if(!container) return;

    container.innerHTML = "";

    delegates.forEach((delegate,index)=>{

        const card = document.createElement("div");

        card.className =
            delegate.frozen
            ? "wallet-card frozen"
            : "wallet-card";

        card.innerHTML = `

            <div class="wallet-top">

                <div class="country">

                    <div class="flag">
                        ${flag(delegate.name)}
                    </div>

                    <div>

                        <h3>${delegate.name}</h3>

                        <div class="wallet-status">

                            ${
                                delegate.frozen
                                ? "Frozen"
                                : "Active"
                            }

                        </div>

                    </div>

                </div>

                <div class="credit-value">

                    ${delegate.credits}

                </div>

            </div>

            <div class="wallet-buttons">

                <button
                    class="wallet-plus"
                    onclick="changeCredits(${index},10)">

                    +10

                </button>

                <button
                    class="wallet-minus"
                    onclick="changeCredits(${index},-10)">

                    -10

                </button>

                <button
                    class="wallet-freeze"
                    onclick="toggleFreeze(${index})">

                    ${
                        delegate.frozen
                        ? "Unfreeze"
                        : "Freeze"
                    }

                </button>

                ${adminMode ? `
<button
class="wallet-history"
onclick="showPurchases(${index})">

View Purchases

</button>
` : ""}

            </div>

        `;

        container.appendChild(card);

    });

}

/*==========================================================
 CREDIT MANAGEMENT
==========================================================*/

function changeCredits(index,amount){

    if(!adminMode){

        toast("Administrator access required");

        return;

    }

    const delegate = delegates[index];

    if(delegate.frozen){

        toast("Wallet is frozen");

        return;

    }

    delegate.credits += amount;

    if(delegate.credits < 0){

        delegate.credits = 0;

    }

    saveData();

    renderWallets();

    renderLeaderboard();

}

/*==========================================================
 FREEZE / UNFREEZE
==========================================================*/

function toggleFreeze(index){

    if(!adminMode){

        toast("Administrator access required");

        return;

    }

    delegates[index].frozen =
        !delegates[index].frozen;

    saveData();

    renderWallets();

}

/*==========================================================
 PURCHASE HISTORY MODAL
==========================================================*/

function showPurchases(index){

if(!adminMode){
    toast("Administrator access required");
    return;
}

    const modal =
        document.getElementById("purchaseModal");

    const content =
        document.getElementById("purchaseModalContent");

    const delegate = delegates[index];

    let html = `
        <h2>
            ${flag(delegate.name)}
            ${delegate.name.toUpperCase()}
        </h2>

        <br>

        <h3>Purchased Perks</h3>
    `;

    if(delegate.purchases.length===0){

        html += `

            <div class="purchase-item">

                No purchases yet.

            </div>

        `;

    }

    else{

        delegate.purchases.forEach(perk=>{

            html += `

                <div class="purchase-item">

                    <span>

                        ✓ ${perk.name}

                    </span>

                    <strong>

                        ${perk.cost} Credits

                    </strong>

                </div>

            `;

        });

    }

    content.innerHTML = html;

    modal.classList.add("active");

}

document

.getElementById("closePurchaseModal")

.addEventListener(

    "click",

    ()=>{

        document

        .getElementById("purchaseModal")

        .classList

        .remove("active");

    }

);

/*==========================================================
 CONFIRMATION MODAL
==========================================================*/

function confirmation(message){

    document

        .getElementById("confirmMessage")

        .textContent = message;

    document

        .getElementById("confirmModal")

        .classList

        .add("active");

}

document

.getElementById("confirmClose")

.addEventListener(

    "click",

    ()=>{

        document

        .getElementById("confirmModal")

        .classList

        .remove("active");

    }

);

/*==========================================================
 PERK PURCHASE
==========================================================*/

function purchasePerk(){

    if(!adminMode){

        toast("Administrator access required");

        return;

    }

    const country =

        document

        .getElementById("shopCountry")

        .value

        .trim();

    if(country===""){

        toast("Enter a country");

        return;

    }

    const delegate = delegates.find(item=>

        item.name.toLowerCase()

        ===

        country.toLowerCase()

    );

    if(!delegate){

        toast("Country not found");

        return;

    }

    if(delegate.frozen){

        toast("Wallet is frozen");

        return;

    }

    const value =

        document

        .getElementById("perkSelect")

        .value

        .split("|");

    const perkName = value[0];

    const perkCost = Number(value[1]);

    if(delegate.credits < perkCost){

        toast("Not enough credits");

        return;

    }

    delegate.credits -= perkCost;

    delegate.purchases.push({

        name:perkName,

        cost:perkCost

    });

    saveData();

    renderWallets();

    renderLeaderboard();

    confirmation(

        perkName +

        " purchased for " +

        delegate.name

    );

}

/*==========================================================
 SHOP BUTTON
==========================================================*/

document

.getElementById("purchaseButton")

.addEventListener(

    "click",

    purchasePerk

);

/*==========================================================
 LEADERBOARD
==========================================================*/

function renderLeaderboard(){

    const container =

        document

        .getElementById("leaderboardContainer");

    if(!container) return;

    container.innerHTML = "";

    [...delegates]

    .sort((a,b)=>

        a.name.localeCompare(b.name)

    )

    .forEach(delegate=>{

        container.innerHTML += `

            <div class="leaderboard-card">

                <div>

                    <h3>

                        ${flag(delegate.name)}
                        ${delegate.name}

                    </h3>

                    <p>

                        Credits

                    </p>

                </div>

                <div class="leaderboard-credits">

                    ${delegate.credits}

                </div>

            </div>

        `;

    });

}

/*==========================================================
 CLOSE MODALS WHEN CLICKING BACKGROUND
==========================================================*/

document

.querySelectorAll(".modal")

.forEach(modal=>{

    modal.addEventListener(

        "click",

        e=>{

            if(e.target===modal){

                modal.classList.remove("active");

            }

        }

    );

});

/*==========================================================
 KEYBOARD SHORTCUTS
==========================================================*/

document

.getElementById("countryInput")

.addEventListener(

    "keydown",

    function(event){

        if(event.key==="Enter"){

            addCountry();

        }

    }

);

document

.getElementById("adminPassword")

.addEventListener(

    "keydown",

    function(event){

        if(event.key==="Enter"){

            loginAdmin();

        }

    }

);

document

.getElementById("shopCountry")

.addEventListener(

    "keydown",

    function(event){

        if(event.key==="Enter"){

            purchasePerk();

        }

    }

);

/*==========================================================
 AUTO SAVE
==========================================================*/

function refreshApplication(){

    saveData();

    renderWallets();

    renderLeaderboard();

}

/*==========================================================
 SAFETY VALIDATION
==========================================================*/

function validateStorage(){

    delegates.forEach(delegate=>{

        if(typeof delegate.credits!=="number"){

            delegate.credits=0;

        }

        if(!Array.isArray(delegate.purchases)){

            delegate.purchases=[];

        }

        if(typeof delegate.frozen!=="boolean"){

            delegate.frozen=false;

        }

    });

}

/*==========================================================
 OPTIONAL RESET
 Uncomment only if needed during development.
==========================================================*/

/*

function resetWallet(){

    if(confirm("Reset all delegate data?")){

        localStorage.removeItem(STORAGE_KEY);

        delegates=[];

        refreshApplication();

        toast("Storage Cleared");

    }

}

*/

/*==========================================================
 STARTUP
==========================================================*/

window.addEventListener(

    "load",

    ()=>{

        loadData();

        validateStorage();

        rotateLandingMessages();

        runBootSequence();

        renderWallets();

        renderLeaderboard();

    }

);

/*==========================================================
 GLOBAL FUNCTIONS
 Required because wallet card buttons use onclick.
==========================================================*/

window.changeCredits = changeCredits;
window.toggleFreeze = toggleFreeze;
window.showPurchases = showPurchases;

/*==========================================================
 END OF FILE
==========================================================*/