package chap03exer;

import java.util.ArrayList;

public class MiniProject2 {

    public static void main(String[] args) {

        // 카드 무늬 4가지
        String[] suits = { "Clubs", "Diamonds", "Hearts", "Spades" };

        // 카드 숫자 13가지
        String[] ranks = { "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace" };

        // 카드 덱 저장할 리스트
        ArrayList<String> deck = new ArrayList<>();

        // 카드 52장 생성 (4 * 13)
        for (int i = 0; i < suits.length; i++) {
            for (int j = 0; j < ranks.length; j++) {
                deck.add(suits[i] + " " + ranks[j]);
            }
        }

        // 카드 섞기 (랜덤으로 자리 바꾸기)
        for (int i = 0; i < deck.size(); i++) {
            int randomIndex = (int)(Math.random() * deck.size());

            // 현재 카드와 랜덤 카드 위치 교환
            String temp = deck.get(i);
            deck.set(i, deck.get(randomIndex));
            deck.set(randomIndex, temp);
        }

        // 앞에서 5장 출력 (중복 없음)
        for (int i = 0; i < 5; i++) {
            System.out.println(deck.get(i));
        }
    }
}