import SparkLine from 'Scripts/Modules/jwtComponents/SparkLine.js';

var Node=React.createClass({displayName: "Node",
  getInitialState:function(){
    return {data:[], pageNo:1, dataStorage:null, isFilter:false, isExpanded:false}
  },
   getDefaultProps:function(){
      return {options:{}}
  },   
   getLinks:function(row, col, index){

      if(!angular.isArray(col.onClick)){
      col.onClick=[col.onClick];
    }
    var linkText=col.linkText;
    if(!linkText){
      linkText=row[col.field];
    }
    if(!angular.isArray(linkText)){
      linkText=[linkText];
    }
    return  col.onClick.map(function(fx, id){return React.createElement("a", {key: id, className: "link indented", onClick: fx.bind(null,row, index), href: "javascript:;"}, linkText[id])})    
  },
  expand:function(){  
    
    this.setState({isExpanded:!this.state.isExpanded});
    
  },

  render: function(){
     var that=this;       
     if(that.state.isExpanded) {
      return React.createElement("tr", null, 
        React.createElement("td", {colSpan: that.props.options.columns.length, className: "child-td"}, 
          React.createElement("table", {className: "tgrid"}, 
            React.createElement("tbody", null, 

                   [React.createElement("tr", {key: that.props.index, className: 'level-'+that.props.data.Level}, 
                      that.props.options.columns.map(function(col, id){        
                    if(col.onClick){                    
                      return React.createElement("td", {key: id, className: col.className, style: col.style}, React.createElement("span", {onClick: that.expand, className: "indented"}, "-"), that.getLinks(that.props.data, col, that.props.index))
                    }                         
                     return React.createElement("td", {key: id, className: col.className, style: col.style}, React.createElement("span", {onClick: that.expand, className: "indented"}, "-"), that.props.data[col.field])              
               
                    })
                   ),
                    that.props.data.ChildList.map(function(row, index){
           
                         return React.createElement(Node, {key: index+that.props.index+1, options: that.props.options, data: row, index: index})
                    })]
             
            )
          )
        )
      )
     
     }
     else{
           return React.createElement("tr", {key: that.props.index, className: 'level-'+that.props.data.Level}, that.props.options.columns.map(that.renderRow))
     }
     
  },
  renderRow:function(col, id){   
   
    if(id==0 && this.props.data.ChildList && this.props.data.ChildList.length>0){
          if(col.onClick){                    
            return React.createElement("td", {key: id, className: col.className, style: col.style}, React.createElement("span", {onClick: this.expand, className: "indented"}, "+"), this.getLinks(this.props.data, col, this.props.index))
          }
          return React.createElement("td", {key: id, className: col.className, style: col.style}, React.createElement("span", {onClick: this.expand, className: "indented"}, "+"), this.props.data[col.field])
      }
      else{
        if(col.spark){
            return React.createElement("td", {key: id, style: col.style}, React.createElement(SparkLine, {data: this.props.data[col.field], options: col.options}))
         }
         if(angular.isFunction(col.render)){
            return React.createElement("td", {key: id, dangerouslySetInnerHTML: {__html: col.render(this.props.data,this.props.index)}})
          }
          if(col.onClick){                    
            return React.createElement("td", {key: id, className: col.className, style: col.style}, this.getLinks(this.props.data, col, this.props.index))
          }
          
         return React.createElement("td", {key: id, className: col.className, style: col.style}, this.props.data[col.field])
      }
  }
  
});
export default Node;

