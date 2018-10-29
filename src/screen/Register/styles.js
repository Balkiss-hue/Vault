import { StyleSheet } from "react-native";

const styles: any = StyleSheet.create({
	container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    fontSize: 20
  },
  input: {
    //color: "white"
    marginBottom:5,
    borderBottomWidth:2
  },
  indicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80
    }
});
export default styles;
