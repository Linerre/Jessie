new_content = []
with open('test.txt', 'r+', encoding='utf-8') as f:
    QAs = f.readlines()
    print(QAs)
    for qa in QAs:
        #print(qa)
        new_content.append(qa.replace('/', '<br>'))

with open('test.txt', 'r+', encoding='utf-8') as f:
    for i in new_content:
        f.write(i)