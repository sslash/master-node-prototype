import java.util.Scanner;
import java.io.File;

public class Parse {

	public Parse(String file) throws Exception{
		Scanner sc = new Scanner(new File(file));
		String [] lines = new String[2000];
		int i = 0;
		while ( sc.hasNextLine() ){
			String line = sc.nextLine();
			String [] args = line.split(" ");
			String username = "SET username:" + args[2] + ":uid " + args[1];
			String password = "SET uid:" + args[1] + ":password 1234";
			System.out.println(username);
			System.out.println(password);
		}

		sc.close();
	}


	public static void main(String [] args) throws Exception{
		new Parse("sap2.txt");
	}

}