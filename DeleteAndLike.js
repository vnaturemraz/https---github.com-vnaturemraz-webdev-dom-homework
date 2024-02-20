export const renderForm = ({commentList}, {listElement}) =>{
    const renderComments = () => {
        const commentsHtml = commentList.map((comment, index) => {
          return `<li class="comment" data-index="${index}">
            <div class="comment-header">
              <div id="add-name">${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div id="add-text" class="comment-text" >
                ${comment.text}
              </div>
            </div>
            <div class="comment-footer">
              <button id="delete-form-button" class="delete-form-button" data-index="${index}">Удалить</button>
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-index="${index}"></button>
              </div>
            </div>
          </li>`;
        })
        .join("");
    
        listElement.innerHTML = commentsHtml;
        initLikeListener({commentList}, {renderComments});
        initDeleteButtonsListeners({commentList}, {renderComments});
        
      };
    renderComments()

}

//Активность кнопки удаления
function initDeleteButtonsListeners({commentList},{renderComments}){
    const deleteButtonsElements = document.querySelectorAll(".delete-form-button");
    for (const deleteButtonsElement of deleteButtonsElements) {
      deleteButtonsElement.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = deleteButtonsElement.dataset.index;
        commentList.splice(index, 1);
        renderComments();
      });
    }
  };

  //Активность кнопки лайк
const initLikeListener = ({commentList}, {renderComments}) => {
    const buttonLike = document.querySelectorAll(".like-button");
    for (const iteratorLike of buttonLike) {
      iteratorLike.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = iteratorLike.dataset.index;
        commentList[index].likes += commentList[index].isLiked ? -1 : +1;
        commentList[index].isLiked = !commentList[index].isLiked;
        renderComments(); //перерисовываем форму для лайков с счетчиком
      });
    }
  };

  //Цитата коммента
// const quoteCommets = ({commentList}, {textAreaElement}) => {
//     const commentElements = document.querySelectorAll(".comment");
//     for (const commentElement of commentElements) {
//       commentElement.addEventListener("click", () => {
//         const index = commentElement.dataset.index;
//         const commentText = commentList[index].text;
//         const commentAuthor = commentList[index].name;
//         textAreaElement.value = `${commentText} > ${commentAuthor}`;
//       })
//     }
//   }
