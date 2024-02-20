 export const loadingBlock = window.addEventListener('load', function() {
    const addSign = document.getElementById('add-sign');
    const list = document.getElementById('comments');
    addSign.innerHTML = "Пожалуйста, подождите, загружаются комментарии...";
    
    list.value = "";
    list.style.display = "none";
    return delayForSecond()
    .then(() => {
        addSign.style.display = "none";
        list.style.display = "block";
        });
    });

    function delayForSecond(){
        delay(3000);
        return delay();
    
    }
    function delay(interval = 2000) {
        return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
        });
    }