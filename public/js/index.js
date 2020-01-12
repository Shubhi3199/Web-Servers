//-------------------------------------------------------------------------
//  1. As window Loads fetch request to API server ------------------------
//--------------------------------------------------------------------------
window.onload = () =>{
    fetchData();
};
const proxy='https://cors-anywhere.herokuapp.com/';
const key='2b402930b24e353f769807ce7d0c15b6';
let data;
const fetchData = async () =>{
    try{
        const result= await fetch(`https://jsonplaceholder.typicode.com/posts/`);
         data=await result.json();
        console.log(data);

        //-------------------------------------------------------------------------
        //  4. placing the data from API into the card ------------------------
        //--------------------------------------------------------------------------

        const renderRecipe = (recipe) => {
            const markup=`
                <div class="col-md-3 mb-4 text-center">
                    <div class="card active">
                        <div class="card-body">
                            <h4 class="card-title">${recipe.title}</h4>
                            <p class="card-text">>${recipe.body}</p>
                        </div>
                    </div>
                </div>
            `;
            searchRes.insertAdjacentHTML('beforeend', markup);
        };

        //-------------------------------------------------------------------------
        //  3. JSON data from the API is an array so for each element execute renderRecipe() function -
        //--------------------------------------------------------------------------

        const renderResults = recipes =>{
            recipes.forEach(el => renderRecipe(el));
        } ;

        renderResults(data);

        const clearLoader = () => {
            const loader= document.querySelector(`.loader`);
            if(data){
                loader.parentElement.removeChild(loader);  //to delete an element first goto parent and then remove child
            }
        };
        clearLoader();



    } catch (error) {
        console.log(error);
    }
};
//-------------------------------------------------------------------------
//  2. Till data is fetched loader on the screen ------------------------
//--------------------------------------------------------------------------

const searchRes = document.querySelector(' .results');
const renderLoader = (parent) =>{
    const loader = `
        <div class="loader">
            <svg>
            <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};
renderLoader(searchRes);
