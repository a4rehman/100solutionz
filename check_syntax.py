import sys

def check_js(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        braces = 0
        brackets = 0
        parens = 0
        for char in content:
            if char == '{': braces += 1
            elif char == '}': braces -= 1
            elif char == '[': brackets += 1
            elif char == ']': brackets -= 1
            elif char == '(': parens += 1
            elif char == ')': parens -= 1
        
        return braces == 0 and brackets == 0 and parens == 0
    except Exception as e:
        print(f"Error reading {filename}: {e}")
        return False

files = ['chatbot.js', 'script.js', 'config.js']
for f in files:
    if check_js(f):
        print(f"{f}: OK")
    else:
        print(f"{f}: MISMATCHED BRACES/PARENS or ERROR")
