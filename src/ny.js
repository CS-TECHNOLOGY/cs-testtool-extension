var myTag;
var tagInfo = {
    id: "",
    class: "",
    name: "",
    text: "",
    value: "",
    tagName: "",
    xPath: "",
};
var likeElement = {
    byId: 0,
    byClass: 0,
}
window.onclick = (e) => { //Khi click vào trang web sẽ chạy vào hàm
    
  console.log(e.target); // log ra thẻ
  myTag = e.target;
  if(myTag.tagName.toUpperCase() !== "INPUT"){
    e.preventDefault(); // chặn sự kiện onclick của button, a , link , ...
  }

  function getElementXPath(element) { // hàm tìm xPat của thẻ
    if (!element) return null;
  
    if (element.id) {
      return `//*[@id=${element.id}]`;
    } else if (element.tagName === "BODY") {
      return "/html/body";
    } else {
      const sameTagSiblings = Array.from(element.parentNode.childNodes).filter(
        (e) => e.nodeName === element.nodeName
      );
      const idx = sameTagSiblings.indexOf(element);
  
      return (
        getElementXPath(element.parentNode) +
        "/" +
        element.tagName.toLowerCase() +
        (sameTagSiblings.length > 1 ? `[${idx + 1}]` : "")
      );
    }
  }
  let byId = document.getElementById(tagInfo.id) // lấy ra các thẻ có id  trùng
  likeElement.byId = Array.isArray(byId) ? byId.length : byId === null ? 0 : 1; // đếm số lượng thẻ trùng id
  let byClass = document.getElementsByClassName(tagInfo.class);
  likeElement.byClass = Array.from(byClass).length;
  if(myTag){
      let myXPath = getElementXPath(myTag)
      tagInfo.xPath = myXPath
  }
  let styleLog = `color: #EFBB35; font-weight: bold; font-size: 1rem;` // màu mè tý, k có cũng được
  console.log(`%c id: ${tagInfo.id}`, styleLog);
  console.log(`%c class: ${tagInfo.class}`, styleLog);
  console.log(`%c xPath: ${tagInfo.xPath}`, styleLog);
  console.log(`%c số phần tử có id #${tagInfo.id} là : ${likeElement.byId} \nsố phần tử có className .${tagInfo.class} là : ${likeElement.byClass}`, styleLog);
};
