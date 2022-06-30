extern crate serde;
extern crate serde_derive;
extern crate serde_json;

use std::{fs::File, io::Read};
use std::fmt;
use std::marker::PhantomData;

use serde::de;
use serde::de::{Deserialize, Deserializer};
use serde_derive::Deserialize;

pub struct Pattern {
    ch: char,
    cnt: u8,
}

#[derive(Deserialize, Debug, Clone)]
pub struct SourceData {
    #[serde(deserialize_with = "string_or_seq_string")]
    data: Vec<String>,
}

pub fn is_vowel(c: char) -> bool {
  let vowelList = ['a', 'e', 'i', 'o','u'];
  return vowelList.contains(&c);
}

pub fn get_pattern(str: String) -> Vec<Pattern>{
    let mut obj:Vec<Pattern> = Vec::new();
    for ch in str.chars() {
        let mut length:usize = obj.len();

        let mut condition: bool = false;
        if (length > 0) {
          condition = obj[length-1].ch != ch;
        }
        if obj.len() == 0 || condition {
            let to_push:Pattern = Pattern {
                ch,
                cnt: 1,
            };
            obj.push(to_push);
        } else {
            let last_index: usize;
            if obj.len() > 0 {
              last_index = obj.len() - 1;
              obj[last_index].cnt += 1;
            }
        }
    }

    return obj;
}

pub fn check_case(word: String) -> bool {
  if word.eq(&word.clone().to_uppercase()) || word.eq(&word.clone().to_lowercase()) {
    return true;
  }
  let char_vec:Vec<char> = word.chars().collect();
  let first_ch:char = char_vec[0];
  if first_ch.is_lowercase() {
    return false;
  }
  let rest:&str = &word[1..];
  rest == rest.clone().to_lowercase()
}

//  aple  => a-1 p-1 l-1 e-1
//  apple => a-1 p-2 l-1 e-1

// O(max(w, l[1]) + max(w, l[2]) + * * * + max(w, l[n]))

pub fn get_suggestions(word: String) -> String {
   let mut file:File = File::open("data.json").unwrap();
   let mut stringdata:String = String::new();
   file.read_to_string(&mut stringdata);
    
   let array_data: SourceData = serde_json::from_str(&stringdata).unwrap();

   let mut input_value:String = word;
   let origin_value:String = input_value.clone();
   let mut suggestions:String = "[".to_string();
   let mut correct:bool = false;

    input_value  = input_value.to_lowercase();
    let input_obj:Vec<Pattern> = get_pattern(input_value.clone());
    println!("{} {}", input_obj[0].ch, input_obj[0].cnt);

    for word in array_data.data.iter() {
        let mut okay:bool = true;

        if check_case(origin_value.clone()) && word.eq(&input_value.clone()) {
            correct = true;
            break;
        }
        
        let word_obj:Vec<Pattern> = get_pattern(word.to_string());
        let mut i = 0;   // for input
        let mut j = 0;   // for curent word

        while i < input_obj.len() && j < word_obj.len() {
            if input_obj[i].ch == word_obj[j].ch  {
                // when ch is constant and amount of word is bigger than amount of input
                if !is_vowel(input_obj[i].ch) && input_obj[i].cnt < word_obj[j].cnt {
                    okay = false;
                    break;
                }
                i = i + 1;
                j = j + 1;
            } else {
                // can miss vowels
                if is_vowel(word_obj[j].ch) {
                    j = j + 1;
                } else {
                    okay = false;
                    break;
                }
            }
        }
        
        while j < word_obj.len() && is_vowel(word_obj[j].ch) {
            j = j + 1;
        }
        // if we didn't reach the end of input or suggestion word
        if i < input_obj.len() || j < word_obj.len() {
            okay = false;
        }
        if okay {
            if suggestions.len() > 1 {
                suggestions.push(',');
            }
            suggestions.push_str(&format!(r#""{}""#,word))
        }
    }
    if correct {
        suggestions = "[".to_string();
    }

    suggestions.push(']');

    let mut result: String = "{".to_string();

    result.push_str(&format!(r#""correct": {}, "suggestions":{}"#, correct, suggestions).to_string());
    result.push('}');

    result
}


fn string_or_seq_string<'de, D>(deserializer: D) -> Result<Vec<String>, D::Error>
    where D: Deserializer<'de>
{
    struct StringOrVec(PhantomData<Vec<String>>);

    impl<'de> de::Visitor<'de> for StringOrVec {
        type Value = Vec<String>;

        fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
            formatter.write_str("string or list of strings")
        }

        fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where E: de::Error
        {
            Ok(vec![value.to_owned()])
        }

        fn visit_seq<S>(self, visitor: S) -> Result<Self::Value, S::Error>
            where S: de::SeqAccess<'de>
        {
            Deserialize::deserialize(de::value::SeqAccessDeserializer::new(visitor))
        }
    }

    deserializer.deserialize_any(StringOrVec(PhantomData))
}