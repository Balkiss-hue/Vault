import { StyleSheet } from "react-native";

const styles: any = StyleSheet.create({
	container: {
        flex: 1,
        justifyContent: 'center',
       // alignItems: 'center',
        backgroundColor: '#EEEEEE', 
      },
  btn: {
    backgroundColor: "#263238",
    alignItems: "center",
    marginTop:10,
    marginBottom:5
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    
  },
  input: {
    //color: "white"
    marginBottom:5,
    borderBottomWidth:2
  },
  linkTxt: {
    color: "#424242",
    fontSize: 14,
    textAlign: "center"
  },header: {
    //height:130,
    backgroundColor: "#263238",
    borderBottomColor: "white",
    borderBottomWidth: 2,
},
});
export default styles;
