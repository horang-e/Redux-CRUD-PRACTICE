// 파일 이름만 prac 이지 제일 공들인 리덕스
// 서버 상태는 아직 미구현 - error, loading 등

import { db } from "../../firebase";

//순서대로 원하는db선택하기(콜렉션),수정할 document가져오기, 하나 가져오기, 여러개 가져오기, 추가하기, 수정하기  firebase
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// action 타입 NORMAL
const LOAD_POST = 'post/LOAD_POST'
const ADD_POST = 'post/ADD_POST'
const UPDATE_POST = 'post/UPDATE_POST'
const DELETE_POST = 'post/DELETE_POST'

const GET_POST_REQUEST = 'post/GET_POST_REQUEST'
const GET_POST_ERROR = 'post/GET_POST_ERROR'

// 초기값 
const initialState = {
    list: [],
    loading: false,
    error: null,
}

// action 함수
const loadPost = (payload) => ({type: LOAD_POST, payload})
const addPost = (payload) => ({type: ADD_POST, payload})
const updatePost = (payload) => ({type: UPDATE_POST, payload})
const deletePost = (payload) => ({type: DELETE_POST, payload})

const getPostRequest = (payload) => ({type: GET_POST_REQUEST, payload})
const getPostError = (payload) => ({type: GET_POST_ERROR, payload})

// thunk
export const __getPosts = () => async(dispatch, getState) => {
    dispatch(getPostRequest(true))
    try{
        const datas = await getDocs(collection(db, "post"));
        const data_list = [];
        datas.forEach((doc)=>{
            data_list.push({id: doc.id, ...doc.data()});
        })
        dispatch(loadPost(data_list));
    }catch(error){
        dispatch(getPostError(error))
    }finally{
        dispatch(getPostRequest(true))
    }
}

export const __addPost = (payload) => async (dispatch, getState) =>{
    dispatch(getPostRequest(true))
    try{
        const data = await addDoc(collection(db, "post"), payload);
        dispatch(addPost({id: data.id, ...payload}))
    }catch(error){
        dispatch(getPostError(error))
    }finally{
        dispatch(getPostRequest(true))
    }
}

export const __updatePost = (payload, index) => async (dispatch, getState) =>{
    dispatch(getPostRequest(true))
    try{
        const data = doc(db, "post", payload.id);
        await updateDoc(data, {
            title: payload.title,
            content: payload.content,
        });
        dispatch(updatePost({payload, index}))
    }catch(error){
        dispatch(getPostError(error))
    }finally{
        dispatch(getPostRequest(true))
    }
}

export const __deletePost = (payload) => async (dispatch, getState) => {
    dispatch(getPostRequest(true))
    try{
        const data = doc(db, "post", payload);
        await deleteDoc(data);
        console(data);
        const index = getState().postReducer.list.findIndex((value)=>{
            return value.id === payload
        });
        console(index);
        dispatch(deletePost(index));
    }catch(error){
        dispatch(getPostError(error))
    }finally{
        dispatch(getPostRequest(true))
    }
}

// reducer
const postReducer = (state = initialState, {type, payload}) =>{
    switch(type){
        case LOAD_POST:
            return{
                ...state,
                list: [...payload]
            }
        case ADD_POST:
            return {
                ...state,
                list: [...state.list, ...payload]
            }
        case UPDATE_POST:
            const dataUpdate = state.list.map((value, index)=>{
                return index === Number(payload.index) ? payload.payload : value;
            })
            return {
                ...state,
                list: dataUpdate,
            }
        case DELETE_POST:
            const dataDelete = state.list.filter((value, index)=>{
                return index === payload ? false : true;
            })
            return {
                ...state,
                list: [...dataDelete]
            }
        default:
            return state;
    }
}

// export 
export default postReducer;