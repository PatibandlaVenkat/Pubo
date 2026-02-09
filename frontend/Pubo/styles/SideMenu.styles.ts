import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({
  overlay:{
    position: "absolute",
    top:0,
    bottom:0,
    left:0,
    right:0,
    flexDirection: "row",
    zIndex: 999,
  },

  menu:{
    paddingTop:60,
    paddingHorizontal:20,
  },

  backdrop:{
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  title:{
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },

  item:{
    paddingVertical: 15,
  },

  text:{
    fontSize:16,
    color:"#fff",
  },

  divider:{
    height: 1,
    backgroundColor: "#94A3B8" 
  }
})