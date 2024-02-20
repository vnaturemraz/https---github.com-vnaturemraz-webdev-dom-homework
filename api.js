let urlApi = "https://wedev-api.sky.pro/api/v1/Alina01/comments";

export function getTodos(){
    return  fetch(urlApi,
        {
          method: 'GET',
        }).then ((response) =>{
          if (response.status === 200) {
            return response.json();
          }
          throw new Error("Сервер сломался");
          
        })
}

export function postTodo({inputElement}, {textAreaElement}){
  return fetch(urlApi,
    {
      method: 'POST',
      body: JSON.stringify({
        text: textAreaElement.value
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;'),
        name: inputElement.value
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;'),
        forceError: true,
      })
    })
}