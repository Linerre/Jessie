# cp files from one sub dirs to another in the same dir. 
# do this for a group of such dir once and for fall
# may need to test under at least two circumenstances
#!/usr/bin/env bash


DIR="/Users/leon/Desktop/Homework-original"
SUB="Submission attachment(s)"
FED="Feedback Attachment(s)"
cd ${DIR}

for item in *; do
  if [ -d "$item" ]; then
    # need to deal with .DS_STORE!q
    if [ "$(ls -A "$item"/"$SUB" | wc -l)" -gt 1 ]; then
      # or
      # [ $(ls -A "$item"/"$SUB") == ".DS_Store"]
      
      #echo "Copying student" "$item" "'s submussion to feedback folder"
      #cp "$item"/"$SUB"/* "$item"/"$FED"/
      echo "$item"/"$SUB" "is not empty."
    else
      echo "$item" "has an empty directory!"
    fi
  else
    printf '%s %s \e[1;31m%s\e[0m %s\n' "$item" 'is' 'NOT' 'a directory.'
  fi
done
cd ..
