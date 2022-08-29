import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import {onPageChanged } from "../../redux/actions"

export const pageLimit =10;




const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';


class Pagination extends Component{
    
    fetchPageNumbers = () => {
      const totalPages = this.props.totalPages;      
      const currentPage = this.props.currentPage;      
      if (totalPages > 1) {        
        let pages = [];        
        const hasLeftSpill = currentPage===1;        
        const hasRightSpill = totalPages===currentPage;        
        switch (true) {
          // handle: (1) <    (10)
          case (!hasLeftSpill && hasRightSpill): {          
            pages = [LEFT_PAGE];
            break;
          }  
          // handle: (1)    > (10)
          case (hasLeftSpill && !hasRightSpill): {
            pages = [RIGHT_PAGE];
            break;
          }
          // handle: (1) <  > (10)
          default:{
            pages = [LEFT_PAGE, RIGHT_PAGE];
            break;
          }
        }
        return [1, ...pages, totalPages];
      }
    }
    render() {
      if (!this.props.totalRecords || this.props.totalPages === 1) return null;  
      const pages = this.fetchPageNumbers();  
      return (       
        <Fragment>
          <div>
            <form>
              {pages && pages.map((page, index) => {
                if (page === LEFT_PAGE) return (
                    <input key={index} type="button" value="<< Previous" onClick={this.handleMoveLeft}></input>
                );
                if (page === RIGHT_PAGE) return (
                  <input key={index} type="button" value="Next >>" onClick={this.handleMoveRight}></input>
                );
                return (
                  <input key={index} type="button" value={ page } onClick={this.handleClick(page)}></input>                  
                );
              }) }
            </form>
          </div>
        </Fragment>
      );
    }
    componentDidMount() {
      this.gotoPage(1);
    }
    
  
    gotoPage = page => {
      const currentPage = page;
      const paginationData = {
        currentPage,
        pageLimit:pageLimit,
      };
     this.props.onPageChanged(paginationData)
    }
  
    handleClick = page => evt => {
      evt.preventDefault();
      this.gotoPage(page);
    }
  
    handleMoveLeft = evt => {
      evt.preventDefault();
      this.gotoPage(this.props.currentPage - 1);
    }
  
    handleMoveRight = evt => {
      evt.preventDefault();
      this.gotoPage(this.props.currentPage + 1);
    }
}
export const mapStateToProps = (state)=>{
  return {
      totalRecords:state.allCountries,
      totalPages:state.totalPages,
      currentPage:state.currentPage
  }
}
export const mapDispatchToProps= (dispatch)=>{
  return{
      onPageChanged:(data)=>dispatch(onPageChanged(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pagination)