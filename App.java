import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.io.BufferedReader;

public class App {

	public static void main (String[] args) {
			ScriptEngineManager manager = new ScriptEngineManager();

			ScriptEngine engine = manager.getEngineByName("JavaScript");

			Path file = Paths.get("dist/index.js");

			try (BufferedReader reader = Files.newBufferedReader(file, StandardCharsets.UTF_8)) {
					engine.eval(reader);
			} catch (Exception e) {
					e.printStackTrace();
			}
	}
}
